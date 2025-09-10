import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FiltersModalProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  categories: string[];
  initialSearchTerm?: string;
  initialCategory?: string;
  children: React.ReactNode;
}

export const FiltersModal = ({
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  categories,
  initialSearchTerm = "",
  initialCategory = "all",
  children,
}: FiltersModalProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(initialSearchTerm);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");

  useEffect(() => {
    setSearch(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = () => {
    onSearchChange(search);
    onCategoryChange(category);
    onLocationChange(location);
    setOpen(false);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setLocation("");
    setPriceRange("all");
    setRating("all");
    onSearchChange("");
    onCategoryChange("all");
    onLocationChange("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-2xl border-0">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground">
              Search filters
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-0 py-4">
          {/* Business Name */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <Label className="text-sm font-medium text-gray-700 w-1/3">
              Business Name
            </Label>
            <div className="w-2/3">
              <Input
                placeholder="Search businesses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-200 focus:border-purple-500 focus-visible:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <Label className="text-sm font-medium text-gray-700 w-1/3">
              Category
            </Label>
            <div className="w-2/3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gray-200 focus:border-purple-500">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <Label className="text-sm font-medium text-gray-700 w-1/3">
              Location
            </Label>
            <div className="w-2/3">
              <Input
                placeholder="City, State..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-gray-200 focus:border-purple-500 focus-visible:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <Label className="text-sm font-medium text-gray-700 w-1/3">
              Price Range
            </Label>
            <div className="w-2/3">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-gray-200 focus:border-purple-500">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="$">$ - Budget Friendly</SelectItem>
                  <SelectItem value="$$">$$ - Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ - Expensive</SelectItem>
                  <SelectItem value="$$$$">$$$$ - Very Expensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between py-4">
            <Label className="text-sm font-medium text-gray-700 w-1/3">
              Rating
            </Label>
            <div className="w-2/3">
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger className="border-gray-200 focus:border-purple-500">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                  <SelectItem value="2+">2+ Stars</SelectItem>
                  <SelectItem value="1+">1+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 hover:bg-gray-50"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};