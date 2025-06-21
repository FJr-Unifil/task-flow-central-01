import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task, Priority } from '@/types/task';
import { Calendar, Save, X, Sparkles } from 'lucide-react';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialData?: Task | null;
}

const TaskForm = ({ isOpen, onClose, onSubmit, initialData }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: '',
    completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority,
        dueDate: initialData.dueDate || '',
        completed: initialData.completed,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        completed: false,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        description: formData.description.trim() || undefined,
        dueDate: formData.dueDate || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      completed: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-orange-200 dark:border-orange-600 shadow-2xl">
        <DialogHeader className="relative">
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl"></div>
          <DialogTitle className="text-xl font-semibold flex items-center space-x-2 relative z-10">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              {initialData ? 'Edit Task' : 'Create New Task'}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-1">
              <span>Task Title</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full border-2 border-orange-200 dark:border-orange-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a description (optional)..."
              className="w-full resize-none border-2 border-orange-200 dark:border-orange-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="border-2 border-orange-200 dark:border-orange-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-600">
                  <SelectItem value="high" className="hover:bg-red-50 dark:hover:bg-red-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-2 shadow-sm"></span>
                      High Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="medium" className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-2 shadow-sm"></span>
                      Medium Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="low" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-2 shadow-sm"></span>
                      Low Priority
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Due Date
              </Label>
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border-2 border-orange-200 dark:border-orange-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center border-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Save className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">{initialData ? 'Update Task' : 'Create Task'}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
