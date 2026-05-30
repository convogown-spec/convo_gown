"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Image as ImageIcon,
  LogOut,
  Upload,
  Trash2,
  Lock,
  User,
  Database,
  AlertCircle,
  Calendar,
  FileImage,
  CheckCircle2,
  FolderHeart,
  Eye,
  X,
  Loader2,
} from "lucide-react";
import styles from "./page.module.css";

interface GalleryImage {
  id: number;
  image_url: string;
  category: "Asset" | "Happy Customer";
  created_at: string;
}

export default function AdminPortal() {
  // Session & Authentication
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "gallery">("dashboard");

  // Login Form States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  // Gallery Listing States
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  // Upload Form States
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState<"Asset" | "Happy Customer">("Asset");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [isUploadSubmitting, setIsUploadSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals & Lightbox
  const [deleteModalImage, setDeleteModalImage] = useState<GalleryImage | null>(null);
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);

  // Drag & Drop State
  const [isDragActive, setIsDragActive] = useState(false);

  // Check auth session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setAdminUser(data.username);
          fetchGallery();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failure:", err);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  // Fetch all gallery records from DB
  async function fetchGallery() {
    setIsGalleryLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryImages(data);
      }
    } catch (err) {
      console.error("Fetch gallery error:", err);
    } finally {
      setIsGalleryLoading(false);
    }
  }

  // Handle Login submission
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoginSubmitting(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setAdminUser(data.username);
        fetchGallery();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch {
      setLoginError("Connection error. Please try again later.");
    } finally {
      setIsLoginSubmitting(false);
    }
  }

  // Handle Logout submission
  async function handleLogout() {
    try {
      const res = await fetch("/api/admin/auth", { method: "DELETE" });
      if (res.ok) {
        setIsAuthenticated(false);
        setAdminUser("");
        setLoginUsername("");
        setLoginPassword("");
        setLoginError("");
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error("Logout failure:", err);
    }
  }

  // Handle File Input Change
  function handleFileChange(file: File) {
    setUploadError("");
    setUploadSuccess("");

    // Validate size (15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size allowed is 15 MB.");
      return;
    }

    // Validate extension
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedExtensions.includes(file.type)) {
      setUploadError("Invalid file type. Only JPG, JPEG, PNG, and WEBP are supported.");
      return;
    }

    setUploadFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Drag and Drop Helpers
  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }

  // Remove uploaded preview image
  function handleClearPreview(e: React.MouseEvent) {
    e.stopPropagation();
    setUploadFile(null);
    setUploadPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Handle Image Upload submission
  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select or drop an image to upload.");
      return;
    }

    setIsUploadSubmitting(true);
    setUploadError("");
    setUploadSuccess("");

    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("category", uploadCategory);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadSuccess(`Successfully uploaded image under category '${uploadCategory}'!`);
        setUploadFile(null);
        setUploadPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchGallery();
      } else {
        const data = await res.json();
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch {
      setUploadError("Server error during upload.");
    } finally {
      setIsUploadSubmitting(false);
    }
  }

  // Inline Category Modification Handler
  async function handleCategoryChange(id: number, newCategory: "Asset" | "Happy Customer") {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });

      if (res.ok) {
        setGalleryImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, category: newCategory } : img))
        );
      } else {
        alert("Failed to update category. Please try again.");
      }
    } catch (err) {
      console.error("Inline edit failure:", err);
    }
  }

  // Image Deletion Handler
  async function handleDeleteConfirm() {
    if (!deleteModalImage) return;

    setIsDeleteSubmitting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteModalImage.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGalleryImages((prev) => prev.filter((img) => img.id !== deleteModalImage.id));
        setDeleteModalImage(null);
      } else {
        alert("Failed to delete image. Please try again.");
      }
    } catch (err) {
      console.error("Delete failure:", err);
    } finally {
      setIsDeleteSubmitting(false);
    }
  }

  // Calculate live statistics
  const totalAssets = galleryImages.filter((img) => img.category === "Asset").length;
  const totalCustomers = galleryImages.filter((img) => img.category === "Happy Customer").length;
  const totalImages = galleryImages.length;

  // Render Full Screen Loader while verifying initial session
  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Initializing Security Portal...</p>
      </div>
    );
  }

  // Render Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginLogo}>Convo Gown</h1>
            <p className={styles.loginSubtitle}>Administration Portal</p>
          </div>

          <form onSubmit={handleLogin}>
            {loginError && (
              <div className={styles.errorBox}>
                <AlertCircle size={18} className={styles.errorIcon} />
                <span>{loginError}</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Enter administrator username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  disabled={isLoginSubmitting}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter security password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={isLoginSubmitting}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={isLoginSubmitting}>
              {isLoginSubmitting ? (
                <>
                  <Loader2 size={18} className={styles.spinner} style={{ margin: 0, width: 18, height: 18 }} />
                  Verifying Credentials...
                </>
              ) : (
                "Authenticate & Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard view if authenticated
  return (
    <div className={styles.container}>
      {/* Mobile Top Header */}
      <div className={styles.mobileHeader}>
        <span className={styles.sidebarTitle}>Convo Gown</span>
        <button className={styles.logoutBtn} onClick={handleLogout} style={{ padding: "8px 12px", width: "auto", margin: 0 }}>
          <LogOut size={16} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Convo Gown</h2>
          <p className={styles.sidebarSubtitle}>Admin Control Panel</p>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${activeTab === "dashboard" ? styles.activeNavLink : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={18} className={styles.navIcon} />
            Dashboard
          </button>
          <button
            className={`${styles.navLink} ${activeTab === "gallery" ? styles.activeNavLink : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <ImageIcon size={18} className={styles.navIcon} />
            Gallery Management
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.topBarTitle}>
            {activeTab === "dashboard" ? "System Dashboard Statistics" : "Gallery Media Management"}
          </h1>
          <div className={styles.topBarUser}>
            <User size={14} className={styles.topBarUserIcon} />
            <span>Active Operator: <strong>{adminUser}</strong></span>
          </div>
        </header>

        <div className={styles.content}>
          {/* --- Tab 1: Dashboard statistics --- */}
          {activeTab === "dashboard" && (
            <div>
              {/* Statistics Cards */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statInfo}>
                    <h3>Total Assets</h3>
                    <p className={styles.statValue}>{totalAssets}</p>
                  </div>
                  <div className={styles.statIconWrapper}>
                    <Database size={24} />
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statInfo}>
                    <h3>Happy Customers</h3>
                    <p className={styles.statValue}>{totalCustomers}</p>
                  </div>
                  <div className={styles.statIconWrapper}>
                    <FolderHeart size={24} />
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statInfo}>
                    <h3>Total Images</h3>
                    <p className={styles.statValue}>{totalImages}</p>
                  </div>
                  <div className={styles.statIconWrapper}>
                    <ImageIcon size={24} />
                  </div>
                </div>
              </div>

              {/* Database Health & Quick Information */}
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <h3 className={styles.infoCardTitle}>
                    <CheckCircle2 size={20} /> System Configuration Status
                  </h3>
                  <div className={styles.quickGuideList} style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span className={styles.dbBadge}>SQLite Database Connected</span>
                      <span className={styles.dbBadge} style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>WAL Mode Active</span>
                    </div>
                  </div>

                  <h3 className={styles.infoCardTitle} style={{ marginTop: 30 }}>
                    Quick Operations Guide
                  </h3>
                  <div className={styles.quickGuideList}>
                    <div className={styles.quickGuideStep}>
                      <span className={styles.stepNum}>1</span>
                      <p>
                        Navigate to the <strong>Gallery Management</strong> module to upload new high-resolution convocation assets or customer images.
                      </p>
                    </div>
                    <div className={styles.quickGuideStep}>
                      <span className={styles.stepNum}>2</span>
                      <p>
                        Always select the correct category before uploading. Images are physically stored, sanitized, and instantly indexed.
                      </p>
                    </div>
                    <div className={styles.quickGuideStep}>
                      <span className={styles.stepNum}>3</span>
                      <p>
                        Review existing images in the catalog. You can change their display categories instantly using the inline selector without re-uploading the file.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- Tab 2: Gallery Management module --- */}
          {activeTab === "gallery" && (
            <div>
              {/* Media Uploader Box */}
              <section className={styles.uploadSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Upload New Media</h2>
                  <p className={styles.sectionDesc}>Select or drag and drop an image file (maximum 15 MB, supported: WebP, PNG, JPG, JPEG)</p>
                </div>

                <form onSubmit={handleUpload} className={styles.uploadForm}>
                  {uploadError && (
                    <div className={styles.errorBox} style={{ margin: 0 }}>
                      <AlertCircle size={18} className={styles.errorIcon} />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className={styles.uploadSuccess}>
                      <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                      <span>{uploadSuccess}</span>
                    </div>
                  )}

                  {/* Drag and Drop Zone */}
                  <div
                    className={`${styles.dropZone} ${isDragActive ? styles.dropZoneActive : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      style={{ display: "none" }}
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => e.target.files && e.target.files[0] && handleFileChange(e.target.files[0])}
                    />

                    {uploadPreview ? (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div className={styles.previewContainer}>
                          <Image
                            src={uploadPreview}
                            alt="Upload preview"
                            fill
                            className={styles.previewImg}
                          />
                          <button
                            type="button"
                            className={styles.removePreviewBtn}
                            onClick={handleClearPreview}
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "12px" }}>
                          Selected: {uploadFile?.name} ({( (uploadFile?.size || 0) / 1024 / 1024 ).toFixed(2)} MB)
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className={styles.dropZoneIcon} />
                        <p className={styles.dropZoneText}>
                          Drag & drop image here, or <span style={{ color: "#c5a870", textDecoration: "underline", fontWeight: 600 }}>browse files</span>
                        </p>
                        <p className={styles.dropZoneSubtext}>Recommended format: Square or landscape aspect ratios</p>
                      </>
                    )}
                  </div>

                  <div className={styles.formControls}>
                    <div className={styles.formGroup} style={{ margin: 0 }}>
                      <label htmlFor="category-select" className={styles.label}>
                        Display Category
                      </label>
                      <select
                        id="category-select"
                        className={styles.select}
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as "Asset" | "Happy Customer")}
                        disabled={isUploadSubmitting}
                      >
                        <option value="Asset">Asset (Gown, Cap, Hood, Stole details)</option>
                        <option value="Happy Customer">Happy Customer (Graduates, Ceremony Ceremonies)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className={styles.loginBtn}
                      style={{ height: "48px", margin: 0 }}
                      disabled={isUploadSubmitting || !uploadFile}
                    >
                      {isUploadSubmitting ? (
                        <>
                          <Loader2 size={18} className={styles.spinner} style={{ margin: 0, width: 18, height: 18 }} />
                          Saving to Server...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload & Publish Image
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </section>

              {/* Media Library List */}
              <section className={styles.gallerySection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Uploaded Media Library ({galleryImages.length})</h2>
                  <p className={styles.sectionDesc}>Edit published display categories inline or permanently delete items from storage.</p>
                </div>

                {isGalleryLoading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 0", color: "#c5a870", gap: "10px" }}>
                    <Loader2 size={24} className={styles.spinner} style={{ margin: 0 }} />
                    <span>Syncing Gallery Registry...</span>
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className={styles.emptyState}>
                    <FileImage size={48} className={styles.emptyIcon} />
                    <p>No uploaded gallery images found in the system.</p>
                    <p style={{ fontSize: "0.8rem", color: "#4b5563" }}>Use the upload panel above to publish your first photo.</p>
                  </div>
                ) : (
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Preview</th>
                          <th>Filename / Path</th>
                          <th>Category</th>
                          <th>Upload Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {galleryImages.map((img) => (
                          <tr key={img.id}>
                            <td>
                              <div
                                className={styles.thumbnailWrapper}
                                onClick={() => setLightboxImageUrl(img.image_url)}
                                title="Expand image preview"
                              >
                                <Image
                                  src={img.image_url}
                                  alt="Preview thumbnail"
                                  fill
                                  className={styles.thumbnail}
                                />
                              </div>
                            </td>
                            <td>
                              <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#9ca3af" }}>
                                {img.image_url.replace("/uploads/gallery/", "")}
                              </span>
                            </td>
                            <td>
                              <select
                                className={styles.inlineSelect}
                                value={img.category}
                                onChange={(e) => handleCategoryChange(img.id, e.target.value as "Asset" | "Happy Customer")}
                              >
                                <option value="Asset">Asset</option>
                                <option value="Happy Customer">Happy Customer</option>
                              </select>
                            </td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#6b7280" }}>
                                <Calendar size={14} />
                                <span>{img.created_at}</span>
                              </div>
                            </td>
                            <td>
                              <div className={styles.rowActions}>
                                <button
                                  className={`${styles.actionBtn}`}
                                  onClick={() => setLightboxImageUrl(img.image_url)}
                                  title="View Image"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                  onClick={() => setDeleteModalImage(img)}
                                  title="Delete Image"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Custom Delete Confirmation Modal */}
      {deleteModalImage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Confirm Permanent Deletion</h3>
              <button className={styles.modalCloseBtn} onClick={() => setDeleteModalImage(null)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ marginBottom: "16px" }}>
                Are you sure you want to permanently delete this gallery image?
              </p>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: "60px", height: "45px", position: "relative", borderRadius: "4px", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={deleteModalImage.image_url} alt="To delete" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ minWidth: 0, flexGrow: 1 }}>
                  <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {deleteModalImage.image_url.replace("/uploads/gallery/", "")}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#c5a870" }}>Category: {deleteModalImage.category}</p>
                </div>
              </div>
              <p style={{ marginTop: "16px", color: "#f87171", fontSize: "0.8rem", fontWeight: 500 }}>
                * This action will delete the database record and permanently delete the physical image file from the server.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => setDeleteModalImage(null)}
                disabled={isDeleteSubmitting}
              >
                Cancel
              </button>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={handleDeleteConfirm}
                disabled={isDeleteSubmitting}
              >
                {isDeleteSubmitting ? "Deleting File..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {lightboxImageUrl && (
        <div className={styles.modalOverlay} onClick={() => setLightboxImageUrl(null)}>
          <div className={`${styles.modal} ${styles.lightboxModal}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightboxImageUrl(null)}>
              <X size={20} /> Close Preview
            </button>
            <div style={{ position: "relative", width: "100%", height: "80vh" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImageUrl}
                alt="Expanded View"
                className={styles.lightboxImg}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
