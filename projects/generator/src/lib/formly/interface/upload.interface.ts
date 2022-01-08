export interface IFileUpload {
    id: number;
    file_name: string;
    file_path: string;
    mime_type: string;
    size: number;
    created_at: string;
    updated_at: string;

}
export interface IImageUpload {
    id: number;
    image_alt: string;
    image_path: string;
    mime_type: string;
    size: number;
    created_at: string;
    updated_at: string;
}
