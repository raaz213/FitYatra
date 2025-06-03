export interface Diet {
    _id: string;
    name: string;
    intake: number;
    image: string;
    macronutrient:{
        protein: number;
        carbohydrates: number;
        fats: number;
    }
    subcategory: string;
    features: string[];
    benefits: string;
}