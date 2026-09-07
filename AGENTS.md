<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Directives & Learned Rules

## 1. Browser & Visual Verification (Playwright)
- Khi xử lý các vấn đề về hiển thị, 3D Canvas, WebGL, CSS layout hoặc runtime errors trên trình duyệt: Chủ động sử dụng Playwright / browser automation để bắt console logs, network errors và chụp ảnh màn hình kiểm chứng trực tiếp.

## 2. MCP Tools Utilization & User Confirmation
- **Tận dụng MCP:** Luôn chủ động nhận diện và sử dụng các công cụ MCP sẵn có (GitHub, Vercel, Supabase, Canva...) để thực thi các tác vụ tích hợp hệ thống nhanh chóng, tự động hóa cao.
- **Xác nhận với Người dùng:** Đối với các tác vụ tạo mới, sửa đổi cấu hình hoặc thay đổi tài nguyên trên các nền tảng bên ngoài (như tạo GitHub repo, liên kết remote, deploy Vercel...), **luôn hỏi ý kiến / xin xác nhận từ User trước khi thực thi**.
