import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../components/CategoryItem", () => ({
    default: ({ category }) => <div>{category.name}</div>,
}));

vi.mock("../components/FeaturedProducts", () => ({
    default: ({ featuredProducts }) => (
        <div data-testid="featured-products">{featuredProducts.length} featured products</div>
    ),
}));

vi.mock("../stores/useProductStore", () => ({
    useProductStore: () => ({
        fetchFeaturedProducts: vi.fn(),
        products: [{ _id: "1", name: "Classic Jacket" }],
        loading: false,
    }),
}));

import HomePage from "./HomePage";

describe("HomePage", () => {
    it("renders the category catalogue and featured products", () => {
        render(<MemoryRouter><HomePage /></MemoryRouter>);

        expect(screen.getByRole("heading", { name: /khám phá danh mục/i })).toBeInTheDocument();
        expect(screen.getByText("Quần jeans")).toBeInTheDocument();
        expect(screen.getByText("Áo thun")).toBeInTheDocument();
        expect(screen.getByTestId("featured-products")).toHaveTextContent("1 featured products");
    });
});
