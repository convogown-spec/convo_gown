"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Image as ImageIcon,
  LogOut,
  UploadCloud,
  X,
  Trash2,
  AlertTriangle,
  Menu,
  CheckCircle,
  FileImage,
} from "lucide-react";
import styles from "./admin.module.css";

interface GalleryImage {
  id: number;
  image_url: string;
  cloudinary_public_id: string;
  category: string;
  created_at: string;
}

interface Stats {
  totalAssets: number;
  totalCustomers: number;
  totalImages: number;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "gallery">("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Statistics State
  const [stats, setStats] = useState<Stats>({
    totalAssets: 0,
    totalCustomers: 0,
    totalImages: 0,
  });

  // Gallery Listing State
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);

  // Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState<"Asset" | "Happy Customer">("Asset");
  const [isUploading, setIsUploading] = useState(false);

  // Notification Banners
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 1. Session check on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          setIsAuthenticated(true);
          setIsAuthLoading(false);
          // Fetch initial data
          fetchStats();
          fetchGallery();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      }
    }
    checkSession();
  }, [router]);

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load statistics:", err);
    }
  };

  // Fetch Gallery List
  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  };

  // Trigger Banner Notifications
  const triggerFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 6000);
  };

  // File Select Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side Validation (Max size: 15 MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      triggerFeedback("error", "Local Validation: File exceeds the 15 MB limit. Please choose a smaller file.");
      return;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      triggerFeedback("error", "Local Validation: Unsupported format. Please select a JPG, JPEG, PNG, or WEBP image.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Form Submit: Stream Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      triggerFeedback("error", "Please select an image file to upload.");
      return;
    }

    setIsUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", uploadCategory);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        triggerFeedback("error", data.error || "Failed to upload image.");
        setIsUploading(false);
        return;
      }

      // Success
      triggerFeedback("success", `Successfully uploaded image: ${data.cloudinary_public_id.split("/").pop()} to Cloudinary and registered in database.`);
      removeSelectedFile();
      fetchStats();
      fetchGallery();
    } catch (error) {
      console.error("Upload error:", error);
      triggerFeedback("error", "Connection error. Unable to upload the image.");
    } finally {
      setIsUploading(false);
    }
  };

  // Edit Category Handler
  const handleCategoryEdit = async (id: number, currentCategory: string, newCategory: string) => {
    if (currentCategory === newCategory) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });

      const data = await res.json();

      if (!res.ok) {
        triggerFeedback("error", data.error || "Failed to update category.");
        return;
      }

      triggerFeedback("success", "Category updated successfully.");
      fetchStats();
      fetchGallery();
    } catch (err) {
      console.error("Edit category error:", err);
      triggerFeedback("error", "Unable to complete category update.");
    }
  };

  // Delete Image Handler
  const handleDeleteImage = async (id: number, publicId: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete this image? \n\nThis will remove it from the PostgreSQL database and destroy it in Cloudinary storage.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        triggerFeedback("error", data.error || "Failed to delete image.");
        return;
      }

      triggerFeedback("success", `Image ${publicId.split("/").pop()} successfully deleted from database and Cloudinary.`);
      fetchStats();
      fetchGallery();
    } catch (err) {
      console.error("Delete error:", err);
      triggerFeedback("error", "Unable to complete deletion.");
    }
  };

  // Admin Logout Handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/admin/login");
    }
  };

  if (isAuthLoading) {
    return (
      <div className={styles.authLoadingWrapper}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Verifying credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoArea}>
          <h2 className={styles.logoTitle}>
            Convo <span className={styles.goldLogoText}>Gown</span>
          </h2>
          <span className={styles.subLogo}>Control Center</span>
        </div>

        <nav className={styles.navMenu}>
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setIsMobileMenuOpen(false);
            }}
            className={`${styles.navItem} ${activeTab === "dashboard" ? styles.activeNavItem : ""}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("gallery");
              setIsMobileMenuOpen(false);
            }}
            className={`${styles.navItem} ${activeTab === "gallery" ? styles.activeNavItem : ""}`}
          >
            <ImageIcon size={20} />
            <span>Gallery Management</span>
          </button>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className={styles.mainContent}>
        {/* Topbar Header */}
        <header className={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              className={styles.hamburger}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Sidebar Menu"
            >
              <Menu size={24} />
            </button>
            <h1 className={styles.headerTitle}>
              {activeTab === "dashboard" ? "Dashboard Statistics" : "Gallery Management"}
            </h1>
          </div>
          <div className={styles.dateDisplay}>
            <span>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Dynamic Global Banners */}
        {feedback && (
          <div
            className={`${styles.feedbackBanner} ${
              feedback.type === "success" ? styles.feedbackBannerSuccess : styles.feedbackBannerError
            }`}
          >
            {feedback.type === "success" ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* View: Dashboard Panel */}
        {activeTab === "dashboard" && (
          <div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.iconAsset}`}>
                  <FileImage size={24} />
                </div>
                <div>
                  <div className={styles.statVal}>{stats.totalAssets}</div>
                  <div className={styles.statLabel}>Total Assets</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.iconCustomer}`}>
                  <ImageIcon size={24} />
                </div>
                <div>
                  <div className={styles.statVal}>{stats.totalCustomers}</div>
                  <div className={styles.statLabel}>Happy Customers</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.iconTotal}`}>
                  <UploadCloud size={24} />
                </div>
                <div>
                  <div className={styles.statVal}>{stats.totalImages}</div>
                  <div className={styles.statLabel}>Total Images</div>
                </div>
              </div>
            </div>

            <section className={styles.infoCard}>
              <h3 className={styles.sectionTitle}>Welcome to Convo Gown Portal</h3>
              <p className={styles.infoDescription}>
                This Vercel-compatible dashboard helps manage all the images displayed on the main gallery.
                All uploaded files are validated server-side, given unique tags, and securely streamed directly to Cloudinary.
              </p>
              <ul className={styles.instructionList}>
                <li><strong>Safe Serverless Storage:</strong> The local disk filesystem is never touched, which ensures that it works on Vercel.</li>
                <li><strong>Public Syncing:</strong> Dynamic database elements automatically propagate and appear on the main website catalog.</li>
                <li><strong>Dynamic Category Shifts:</strong> Category edits can be performed instantly below in the Gallery module on the fly, with zero re-uploads required!</li>
              </ul>
            </section>
          </div>
        )}

        {/* View: Gallery Management Panel */}
        {activeTab === "gallery" && (
          <div className={styles.galleryControlSection}>
            {/* Upload form Panel */}
            <section className={styles.uploadCard}>
              <h3 className={styles.sectionTitle} style={{ fontSize: "1.3rem", marginBottom: "20px" }}>
                Upload New Image
              </h3>
              <form onSubmit={handleUploadSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Image Upload</label>
                  {!filePreview ? (
                    <div
                      className={styles.fileUploadArea}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud className={styles.uploadIcon} size={40} />
                      <p className={styles.uploadHelper}>Drag and drop or click to browse</p>
                      <p className={styles.uploadSpecs}>Supports: JPG, JPEG, PNG, WEBP (Max 15 MB)</p>
                    </div>
                  ) : (
                    <div className={styles.previewBox}>
                      <button
                        type="button"
                        className={styles.removeFileBtn}
                        onClick={removeSelectedFile}
                        aria-label="Remove selected image"
                      >
                        <X size={16} />
                      </button>
                      <Image
                        src={filePreview}
                        alt="Upload Preview Thumbnail"
                        fill
                        className={styles.previewImg}
                      />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className={styles.hiddenInput}
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.formLabel}>
                    Category Dropdown
                  </label>
                  <select
                    id="category"
                    className={styles.selectField}
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as "Asset" | "Happy Customer")}
                    disabled={isUploading}
                  >
                    <option value="Asset">Asset</option>
                    <option value="Happy Customer">Happy Customer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={styles.uploadBtn}
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <>
                      <div className={styles.loadingSpinner} style={{ width: "16px", height: "16px", borderWidth: "2px", margin: 0 }} />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={18} />
                      <span>Upload Image</span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* Gallery images display Registry */}
            <section className={styles.registryCard}>
              <div className={styles.registryHeader}>
                <h3 className={styles.sectionTitle} style={{ fontSize: "1.3rem", margin: 0 }}>
                  Uploaded Gallery Images ({galleryItems.length})
                </h3>
              </div>

              <div className={styles.registryGrid}>
                {galleryItems.length === 0 ? (
                  <div className={styles.emptyState}>
                    <ImageIcon className={styles.emptyStateIcon} size={48} />
                    <p>No gallery images uploaded yet.</p>
                  </div>
                ) : (
                  galleryItems.map((item) => (
                    <div key={item.id} className={styles.imageGridItem}>
                      <div className={styles.gridImageWrapper}>
                        <Image
                          src={item.image_url}
                          alt={item.cloudinary_public_id}
                          fill
                          sizes="(max-width: 600px) 100vw, 300px"
                          className={styles.gridItemImage}
                        />
                        <span
                          className={`${styles.itemBadge} ${
                            item.category === "Asset" ? styles.badgeAsset : styles.badgeCustomer
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>

                      <div className={styles.itemDetails}>
                        <span className={styles.itemMeta}>
                          Uploaded: {new Date(item.created_at).toLocaleDateString()}
                        </span>

                        <div className={styles.itemActions}>
                          <select
                            aria-label="Change category selection"
                            className={styles.itemSelect}
                            value={item.category}
                            onChange={(e) =>
                              handleCategoryEdit(item.id, item.category, e.target.value)
                            }
                          >
                            <option value="Asset">Asset</option>
                            <option value="Happy Customer">Happy Customer</option>
                          </select>

                          <button
                            className={styles.deleteIconBtn}
                            onClick={() => handleDeleteImage(item.id, item.cloudinary_public_id)}
                            aria-label="Delete gallery image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
