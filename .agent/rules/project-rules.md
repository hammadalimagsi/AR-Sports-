# Project Rules

1. Frontend-only architecture until explicitly approved otherwise.
2. Use React functional components and hooks.
3. Keep components small, reusable and organized by responsibility.
4. Separate product data from presentation components.
5. Use localStorage only for appropriate client-side persistence such as the cart.
6. Validate customization fields and sanitize user-provided text where necessary.
7. Build WhatsApp URLs using encodeURIComponent.
8. Store the WhatsApp phone number in a clearly documented configuration file; never invent the real client number.
9. Use GLB/GLTF models only when real model files are available.
10. Provide a graceful image-gallery fallback if a 3D model is missing or fails to load.
11. Lazy-load heavy 3D scenes where practical.
12. Support keyboard navigation, accessible labels, useful focus states and reduced-motion preferences.
13. Optimize images, 3D assets and mobile performance.
14. Use responsive layouts for mobile, tablet and desktop.
15. Never expose API secrets or sensitive customer information.
16. Do not add dependencies without checking compatibility and necessity.
17. Do not modify unrelated files.
18. Do not claim tests pass unless they were actually run.
19. Keep prices, currency, shipping policies and stock configurable.
20. Follow the approved project brief and implementation plan.