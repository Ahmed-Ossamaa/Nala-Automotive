
import { Upload, X } from 'lucide-react';
import { useState } from 'react';


export const ImageUpload = ({
    label,
    error,
    multiple = false,
    maxFiles = 10,
    onChange,
    accept = "image/*"
}) => {
    const [previews, setPreviews] = useState([]);
    const id = `file-upload-${Math.random().toString(36).substring(2,9)}`;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const newPreviews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
        setPreviews(newPreviews);
        onChange(files);
    };

    const removeImage = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        onChange(newPreviews.map(p => p.file));
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="hidden"
                    id={id}
                />
                <label htmlFor={id} className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">
                        Click to upload 
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WEBP up to 5MB
                    </p>
                </label>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={preview.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};
