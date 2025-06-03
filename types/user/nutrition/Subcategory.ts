export interface Subcategory {
    _id: string;
    name: string;
    category: {
        _id: string;
        name: string;
    };
    
}

export interface formData {
    name: string;
    category: string;
}