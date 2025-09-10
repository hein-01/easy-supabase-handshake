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
  const [category, setCategory] = useState(initialCategory);


  const handleSearch = () => {
    onCategoryChange(category);
    setOpen(false);
  };

  const handleReset = () => {
    setCategory("all");
    onCategoryChange("all");
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
          {/* Category */}
          <div className="flex items-center justify-between py-4">
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