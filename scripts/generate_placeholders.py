import os

def create_directory():
    os.makedirs('public/assets', exist_ok=True)

def write_svg(filename, content):
    filepath = os.path.join('public/assets', filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Generated {filepath}")

def generate_assets():
    create_directory()
    
    # 1. Logo SVG
    logo_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="50%" stop-color="#c5a870" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="#0b162c" />
  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
  <path d="M50 25 L80 38 L50 51 L20 38 Z" fill="url(#goldGrad)" />
  <path d="M35 45 L35 63 C35 68, 65 68, 65 63 L65 45" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
  <path d="M50 38 L72 50 L72 68" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" />
  <circle cx="72" cy="70" r="3" fill="url(#goldGrad)" />
</svg>
"""

    # 2. Hero Background SVG
    hero_bg_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050a14" />
      <stop offset="40%" stop-color="#0b1325" />
      <stop offset="100%" stop-color="#162238" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c5a870" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#050a14" stop-opacity="0" />
    </radialGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#skyGrad)" />
  <rect width="1200" height="800" fill="url(#glow)" />
  <g filter="url(#blur)" opacity="0.3">
    <path d="M600 450 L680 520 L660 800 L540 800 L520 520 Z" fill="#04070e" />
    <path d="M600 370 L650 395 L600 420 L550 395 Z" fill="#04070e" />
    <rect x="585" y="395" width="30" height="40" fill="#04070e" />
    <path d="M300 480 L370 550 L350 800 L250 800 L230 550 Z" fill="#03050b" />
    <path d="M300 400 L350 425 L300 450 L250 425 Z" fill="#03050b" />
  </g>
  <circle cx="600" cy="200" r="150" fill="#c5a870" opacity="0.05" filter="url(#blur)" />
</svg>
"""

    # 3. Graduation Gowns SVG
    gown_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <rect width="400" height="500" fill="#e9e7e2" />
  <rect x="196" y="80" width="8" height="360" fill="#3a3a3a" />
  <ellipse cx="200" cy="440" rx="40" ry="12" fill="#3a3a3a" />
  <path d="M150 100 L200 75 L250 100 Z" fill="none" stroke="#3a3a3a" stroke-width="4" />
  <circle cx="200" cy="75" r="8" fill="#3a3a3a" />
  <path d="M150 110 L250 110 L280 400 L120 400 Z" fill="#0d1b32" />
  <path d="M150 110 L110 320 L150 320 L165 180 Z" fill="#122544" />
  <path d="M250 110 L290 320 L250 320 L235 180 Z" fill="#122544" />
  <path d="M165 110 L200 160 L235 110 L245 400 L155 400 Z" fill="#162e54" />
  <path d="M200 160 L200 400" fill="none" stroke="#0b162c" stroke-width="2" />
  <path d="M180 110 L200 140 L220 110 Z" fill="#060b14" />
</svg>
"""

    # 4. Convocation Caps SVG
    cap_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="50%" stop-color="#c5a870" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#efebe4" />
  <ellipse cx="200" cy="360" rx="90" ry="25" fill="#000000" opacity="0.1" />
  <path d="M140 248 L140 310 C140 335, 260 335, 260 310 L260 248" fill="#181818" />
  <polygon points="80,227 200,277 320,227 200,177" fill="#2c2c2c" />
  <ellipse cx="200" cy="227" rx="8" ry="4" fill="url(#goldGrad)" />
  <path d="M200 227 C230 235, 270 270, 275 320" fill="none" stroke="url(#goldGrad)" stroke-width="3.5" stroke-linecap="round" />
  <polygon points="271,320 279,320 283,370 267,370" fill="url(#goldGrad)" />
</svg>
"""

    # 5. Academic Hoods SVG
    hood_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b91c1c" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#e5e2db" />
  <path d="M120 180 C120 140, 280 140, 280 180 L330 450 L70 450 Z" fill="#0d1b32" />
  <path d="M145 180 C145 160, 255 160, 255 180" fill="none" stroke="#111827" stroke-width="16" stroke-linecap="round" />
  <path d="M145 186 C150 250, 120 380, 200 420 C280 380, 250 250, 255 186 Z" fill="url(#redGrad)" />
  <path d="M165 210 C175 270, 160 350, 200 395 C240 350, 225 270, 235 210 Z" fill="url(#goldGrad)" />
</svg>
"""

    # 6. Custom Stoles SVG
    stole_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldSatin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5e3b5" />
      <stop offset="30%" stop-color="#e2c275" />
      <stop offset="70%" stop-color="#c5a870" />
      <stop offset="100%" stop-color="#9a7b41" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#eae7df" />
  <path d="M160 80 C160 40, 240 40, 240 80" fill="none" stroke="url(#goldSatin)" stroke-width="32" stroke-linecap="round" />
  <path d="M144 80 L144 420 L194 440 L194 80 Z" fill="url(#goldSatin)" />
  <path d="M256 80 L256 420 L206 440 L206 80 Z" fill="url(#goldSatin)" />
</svg>
"""

    # 7. Degree Folders SVG
    folder_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#ebdcc8" />
  <rect x="40" y="130" width="320" height="240" rx="8" fill="#1c1b18" />
  <rect x="75" y="165" width="250" height="170" rx="4" fill="url(#goldGrad)" />
  <line x1="120" y1="200" x2="280" y2="200" stroke="#483818" stroke-width="2" />
</svg>
"""

    # 8. Event Branding SVG
    branding_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="blueCurtain" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0a1220" />
      <stop offset="50%" stop-color="#0d1828" />
      <stop offset="100%" stop-color="#0a1220" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#111111" />
  <rect y="40" width="400" height="340" fill="url(#blueCurtain)" />
  <polygon points="0,380 400,380 400,500 0,500" fill="#2d1c0b" />
  <rect x="60" y="40" width="40" height="280" fill="url(#goldGrad)" opacity="0.8" />
  <rect x="300" y="40" width="40" height="280" fill="url(#goldGrad)" opacity="0.8" />
</svg>
"""

    # 9. Keepsake Accessories SVG
    accessory_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff0d0" />
      <stop offset="100%" stop-color="#8c6f37" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#eae7e1" />
  <path d="M200 40 L160 280 L200 300 L240 280 Z" fill="#0f172a" />
  <circle cx="200" cy="310" r="55" fill="url(#goldGrad)" />
</svg>
"""

    # 10. Certificate Holders SVG
    holder_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc58d" />
      <stop offset="100%" stop-color="#a88b53" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="#f0eae1" />
  <rect x="60" y="100" width="280" height="340" rx="10" fill="#fcfbf7" />
  <rect y="260" width="400" height="40" fill="#f4f0df" opacity="0.9" />
  <circle cx="200" cy="280" r="20" fill="url(#goldGrad)" />
</svg>
"""

    # 11. Sizing Model SVG
    model_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe6a7" />
      <stop offset="100%" stop-color="#9a7b41" />
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffedd5" />
      <stop offset="100%" stop-color="#fed7aa" />
    </linearGradient>
  </defs>
  <rect width="500" height="700" fill="url(#bgGrad)" />
  <path d="M170 420 C150 470, 120 580, 100 700 L400 700 C380 580, 350 470, 330 420 Z" fill="#0d1b32" />
  <path d="M202 420 C205 450, 190 530, 250 570 C310 530, 295 450, 298 420 Z" fill="url(#goldGrad)" />
  <ellipse cx="250" cy="320" rx="45" ry="55" fill="url(#skin)" />
  <polygon points="160,140 250,165 340,140 250,115" fill="#222222" />
</svg>
"""

    # 12. Kid Size SVG
    kid_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" rx="8" fill="#fdfbf7" />
  <path d="M110 210 C100 230, 80 280, 70 300 L230 300 C220 280, 200 230, 190 210 Z" fill="#1b2e4c" />
  <circle cx="150" cy="140" r="35" fill="#ffedd5" />
  <polygon points="95,92 150,108 205,92 150,76" fill="#111827" />
</svg>
"""

    # 13. School Size SVG
    school_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" rx="8" fill="#fdfbf7" />
  <path d="M110 210 C100 230, 80 280, 70 300 L230 300 C220 280, 200 230, 190 210 Z" fill="#0b162c" />
  <ellipse cx="150" cy="138" rx="32" ry="38" fill="#ffedd5" />
  <polygon points="96,88 150,103 204,88 150,73" fill="#111827" />
</svg>
"""

    # 14. Custom Gown Embroidery Detail SVG
    embroidery_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
  <defs>
    <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a60" />
      <stop offset="100%" stop-color="#0a1828" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe6a7" />
      <stop offset="50%" stop-color="#c5a870" />
      <stop offset="100%" stop-color="#9a7b41" />
    </linearGradient>
  </defs>
  <rect width="500" height="400" fill="url(#fabricGrad)" />
  <path d="M0 80 L180 80 L280 400 L0 400 Z" fill="#0b162c" opacity="0.9" />
  <g transform="translate(140, 240) scale(1.8)">
    <polygon points="25,0 50,18 50,55 25,75 0,55 0,18" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
    <path d="M15 32 L35 32 L35 52 L15 52 Z" fill="url(#goldGrad)" />
  </g>
</svg>
"""

    # 15. Kerala Coconut Beach Road Landscape SVG
    kerala_road_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff7e5f" />
      <stop offset="100%" stop-color="#ffeccc" />
    </linearGradient>
    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
  </defs>
  <rect width="600" height="350" fill="url(#skyGrad)" />
  <path d="M0 200 C150 200, 250 240, 300 350 L0 350 Z" fill="url(#seaGrad)" />
  <polygon points="400,350 480,350 350,150 320,150" fill="#334155" />
</svg>
"""

    # 16. Graduation Hall Stage Background SVG
    ready_bg_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070c18" />
      <stop offset="100%" stop-color="#14223d" />
    </linearGradient>
  </defs>
  <rect width="1200" height="600" fill="url(#skyGrad)" />
</svg>
"""

    # NEW 17. Gallery CUSAT Day SVG
    gallery_cusat_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" fill="#0d1b32" />
  <circle cx="200" cy="100" r="80" fill="#c5a870" opacity="0.1" />
  <path d="M100 240 L150 170 L200 170 L250 240 L220 280 L130 280 Z" fill="#122544" />
  <polygon points="120,130 175,145 230,130 175,115" fill="#2c2c2c" />
</svg>
"""

    # NEW 18. Gallery Calicut Day SVG
    gallery_calicut_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" fill="#0b162c" />
  <circle cx="200" cy="100" r="80" fill="#ef4444" opacity="0.1" />
  <path d="M100 240 L150 170 L200 170 L250 240 Z" fill="#162e54" />
  <path d="M130 170 C140 210, 210 210, 220 170 Z" fill="#991b1b" />
</svg>
"""

    # NEW 19. Gallery Custom Stoles SVG
    gallery_stoles_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" fill="#eae7df" />
  <path d="M130 50 L130 270 L170 280 L170 50 Z" fill="#e2c275" />
  <path d="M230 50 L230 270 L190 280 L190 50 Z" fill="#c5a870" />
</svg>
"""

    # NEW 20. Gallery Caps Tossing SVG
    gallery_caps_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sky)" />
  <!-- Floating cap diamonds -->
  <polygon points="60,60 90,70 120,60 90,50" fill="#111827" />
  <polygon points="260,80 290,90 320,80 290,70" fill="#111827" />
  <polygon points="170,120 195,128 220,120 195,112" fill="#111827" />
</svg>
"""

    # NEW 21. Gallery Kid SVG
    gallery_kid_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" fill="#fdfbf7" />
  <path d="M150 200 C140 215, 120 250, 110 270 L250 270 C240 250, 220 215, 210 200 Z" fill="#1b2e4c" />
  <circle cx="180" cy="150" r="25" fill="#ffedd5" />
</svg>
"""

    # NEW 22. Gallery Stage Branding Setup SVG
    gallery_ceremony_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" fill="#1e293b" />
  <rect x="50" y="30" width="300" height="200" fill="#0f172a" />
  <rect x="100" y="30" width="30" height="200" fill="#c5a870" opacity="0.8" />
  <rect x="270" y="30" width="30" height="200" fill="#c5a870" opacity="0.8" />
</svg>
"""

    write_svg('logo.svg', logo_svg)
    write_svg('hero_bg.svg', hero_bg_svg)
    write_svg('gown.svg', gown_svg)
    write_svg('cap.svg', cap_svg)
    write_svg('hood.svg', hood_svg)
    write_svg('stole.svg', stole_svg)
    write_svg('folder.svg', folder_svg)
    write_svg('branding.svg', branding_svg)
    write_svg('accessory.svg', accessory_svg)
    write_svg('holder.svg', holder_svg)
    write_svg('model.svg', model_svg)
    write_svg('kid.svg', kid_svg)
    write_svg('school.svg', school_svg)
    write_svg('embroidery.svg', embroidery_svg)
    write_svg('kerala_road.svg', kerala_road_svg)
    write_svg('ready_bg.svg', ready_bg_svg)
    write_svg('gallery_cusat.svg', gallery_cusat_svg)
    write_svg('gallery_calicut.svg', gallery_calicut_svg)
    write_svg('gallery_stoles.svg', gallery_stoles_svg)
    write_svg('gallery_caps.svg', gallery_caps_svg)
    write_svg('gallery_kid.svg', gallery_kid_svg)
    write_svg('gallery_ceremony.svg', gallery_ceremony_svg)

if __name__ == '__main__':
    generate_assets()
