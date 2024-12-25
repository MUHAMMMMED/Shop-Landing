// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react'; // useEffect for lifecycle management, useState for managing state
import AxiosInstance from '../../../../../../Authentication/AxiosInstance'; // Axios instance for API calls
import Config from '../../../../../../components/config'; // Configuration file for base URL or other constants
import Card from '../Product/components/Card/Card'; // Card component to display individual product information
import "./ProductFilter.css"; // Importing CSS file for styling the component

// Functional component definition for filtering products
export default function ProductFilter({ pageId, sectionId }) {
    // State variables
    const [categories, setCategories] = useState([]); // To store list of product categories
    const [products, setProducts] = useState([]); // To store list of filtered products
    const [filters, setFilters] = useState({ // To manage filter values (category, SSKU, name)
        category: '',
        ssku: '',
        name: ''
    });

    // Function to fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories/`); // API call for categories
            setCategories(response.data); // Update the categories state with the fetched data
        } catch (error) {
            console.error('Error fetching categories', error); // Log errors if API call fails
        }
    };

    // Function to fetch filtered products based on the current filters
    const fetchProducts = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_dash/`, {
                params: filters // Pass the current filters as query parameters
            });
            setProducts(response.data.products); // Update the products state with the fetched data
        } catch (error) {
            console.error('Error fetching products', error); // Log errors if API call fails
        }
    };

    // useEffect to fetch categories on initial render
    useEffect(() => {
        fetchCategories(); // Fetch categories once when the component is mounted
    }, []);

    // Handler function for filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target; // Destructure input field name and value
        setFilters((prevFilters) => ({ // Update filters state dynamically based on user input
            ...prevFilters,
            [name]: value
        }));
    };

    // useEffect to refetch products whenever the filters change
    useEffect(() => {
        fetchProducts(); // Fetch products whenever the filters state updates
    }, [filters]);

    // Component JSX structure
    return (
        <>
            {/* Toolbar for filters */}
            <div className="toolbar">
                {/* Search input for product name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    className="search-input"
                    onChange={handleFilterChange}
                />
                {/* Search input for product SSKU */}
                <input
                    type="text"
                    name="ssku"
                    placeholder="Search by SSKU"
                    className="search-input"
                    onChange={handleFilterChange}
                />
                {/* Dropdown for selecting a category */}
                <select
                    name="category"
                    className="dropdown"
                    onChange={handleFilterChange}
                >
                    <option value="">All Categories</option> {/* Default option to show all categories */}
                    {categories.map((cat) => ( // Iterate over categories to create dropdown options
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Product display area */}
            <div style={{ with: '100%' }}>
                {/* Display products in a grid or list format using Card components */}
                {pageId && sectionId && products.map((item, index) => (
                    <Card key={index} data={item} module_name={'product'} pageId={pageId} sectionId={sectionId} />
                ))}
            </div>
        </>
    );
}