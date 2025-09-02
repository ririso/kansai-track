require("@testing-library/jest-dom");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
