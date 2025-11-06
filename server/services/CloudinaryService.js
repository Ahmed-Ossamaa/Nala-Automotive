const cloudinary  = require('../config/cloudinary');

class CloudinaryService {
    // Upload single image
    async uploadImage(fileBuffer, folder = 'car-resale') {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: 'auto',
                    transformation: [
                        { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) {
                        reject(new Error(`Image upload failed: ${error.message}`));
                    } else {
                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id
                        });
                    }
                }
            );
            uploadStream.end(fileBuffer);
        });
    }

    // Upload multiple images
    async uploadMultipleImages(fileBuffers, folder = 'car-resale') {
        const uploadPromises = fileBuffers.map(buffer =>
            this.uploadImage(buffer, folder)
        );
        return await Promise.all(uploadPromises);
    }

    // Delete single image
    async deleteImage(publicId) {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== 'ok') {
                throw new Error('Image deletion failed');
            }
            return result;
        } catch (error) {
            throw new Error(`Image deletion failed: ${error.message}`);
        }
    }

    // Delete multiple images
    async deleteMultipleImages(publicIds) {
        const deletePromises = publicIds.map(id => this.deleteImage(id));
        return await Promise.all(deletePromises);
    }

    // Delete all car images (thumbnail + images array)
    async deleteCarImages(car) {
        const imagesToDelete = [];

        if (car.thumbnail && car.thumbnail.publicId) {
            imagesToDelete.push(car.thumbnail.publicId);
        }

        if (car.images && car.images.length > 0) {
            car.images.forEach(image => {
                if (image.publicId) {
                    imagesToDelete.push(image.publicId);
                }
            });
        }

        if (imagesToDelete.length > 0) {
            return await this.deleteMultipleImages(imagesToDelete);
        }

        return [];
    }
}

module.exports = new CloudinaryService();