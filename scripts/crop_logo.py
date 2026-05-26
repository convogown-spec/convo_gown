from PIL import Image

def crop_and_zoom_logo():
    src_path = r"C:\Users\LEVONO\.gemini\antigravity-ide\brain\46d513f1-104e-4460-a319-4be1c237b837\media__1779785636719.png"
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    
    # Get bounding box of non-transparent and non-white pixels
    left, top, right, bottom = width, height, 0, 0
    
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Check if the pixel is not transparent and not white
            is_transparent = (a < 15)
            is_white = (r > 240 and g > 240 and b > 240)
            
            if not is_transparent and not is_white:
                if x < left:
                    left = x
                if x > right:
                    right = x
                if y < top:
                    top = y
                if y > bottom:
                    bottom = y
                    
    # Validate bounding box
    if left >= right or top >= bottom:
        print("Could not detect bounding box. Defaulting to full image.")
        left, top, right, bottom = 0, 0, width, height
    else:
        # Add a tiny, beautiful padding (e.g. 5 pixels)
        padding = 10
        left = max(0, left - padding)
        top = max(0, top - padding)
        right = min(width, right + padding)
        bottom = min(height, bottom + padding)
        
    # Crop the image to the bounding box of the cap
    cropped_img = img.crop((left, top, right, bottom))
    
    # Make it a perfect square to prevent squishing or skewing
    c_width, c_height = cropped_img.size
    max_dim = max(c_width, c_height)
    square_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0)) # transparent background
    
    # Paste cropped image into center of the square canvas
    paste_x = (max_dim - c_width) // 2
    paste_y = (max_dim - c_height) // 2
    square_img.paste(cropped_img, (paste_x, paste_y))
    
    # Resize to high resolution 512x512
    final_img = square_img.resize((512, 512), Image.Resampling.LANCZOS)
    
    # Save as PNG logo
    final_img.save(r"public\assets\logo_v2.png", "PNG")
    print("Saved public\\assets\\logo_v2.png")
    
    # Save as favicon.ico
    final_img.save(r"src\app\favicon.ico", "ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128)])
    print("Saved src\\app\\favicon.ico")

if __name__ == "__main__":
    crop_and_zoom_logo()
