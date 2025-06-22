import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onValueChange,
  placeholder = "Selecione uma data",
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border border-gray-300 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", { locale: ptBR })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          initialFocus
          locale={ptBR}
          className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-gray-900 dark:text-white",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-200 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-md transition-colors"
            ),
            day_range_end: "day-range-end",
            day_selected:
              "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 focus:from-orange-600 focus:to-red-600",
            day_today: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold",
            day_outside:
              "day-outside text-gray-400 dark:text-gray-500 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-gray-400 dark:text-gray-500 opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
} 