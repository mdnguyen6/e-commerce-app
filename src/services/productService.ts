import http from '../apis/http-common'
import Product from '../model/Product.type'

const ProductService = {
    getAll(limit?:number, sort?:string) {
        return http.get<Array<Product>>(`/products?limit=${limit}&sort=${sort}`);
    },
    getById(id: Number) {
        return http.get<Product>(`/products/${id}`);
    },
    getCategory() {
        return http.get<Array<string>>(`/products/categories`)
    },
    getByCategory(category: string, limit?:number, sort?:string) {
        return http.get<Array<Product>>(`/products/category/${category}?limit=${limit}&sort=${sort}`)
    }
}

export default ProductService;