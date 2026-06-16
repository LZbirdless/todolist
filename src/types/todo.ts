/**
 * Interface đại diện cho một Task/Todo
 * 
 * 💡 Angular equivalent: Giống hệt - dùng interface như thường
 * ```typescript
 * // Angular: declare trong service hoặc .models file
 * export interface Todo {
 *   id: number;
 *   text: string;
 *   completed: boolean;
 *   createdAt: Date;
 * }
 * ```
 * Vue không cần declare anywhere - dùng trực tiếp trong component
 */
export interface Todo {
  /** Unique ID - dùng Date.now() cho simple app */
  id: number;
  
  /** Nội dung task */
  text: string;
  
  /** Trạng thái hoàn thành */
  completed: boolean;
  
  /** Thời gian tạo */
  createdAt: number;
}

/** Các chế độ filter cho danh sách todo */
export type FilterType = 'all' | 'active' | 'completed';

/** Profile user trong sidebar */
export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}