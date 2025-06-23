import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Task, Priority } from '@/types/task';
import { Save, X, Sparkles } from 'lucide-react';

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
    priority: 'Média' as Priority,
    dueDate: undefined as Date | undefined,
    completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate) : undefined,
        completed: initialData.completed,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Média',
        dueDate: undefined,
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
        dueDate: formData.dueDate?.toISOString() || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Média',
      dueDate: undefined,
      completed: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 dark:border-slate-600 shadow-2xl">
        <DialogHeader className="relative">
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl"></div>
          <DialogTitle className="text-xl font-semibold flex items-center space-x-2 relative z-10">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <img src="/achievo_dark.png" alt="Task Manager" className="h-14 w-14 dark:hidden rounded-lg" />
              <img src="/achievo.png" alt="Task Manager" className="h-14 w-14 hidden dark:block rounded-lg" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              {initialData ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-1">
              <span>Título da Tarefa</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full border border-gray-200 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a description (optional)..."
              className="w-full resize-none border border-gray-200 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Prioridade
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="border border-gray-200 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg rounded-lg overflow-hidden">
                  <SelectItem value="Alta" className="hover:bg-red-50 dark:hover:bg-red-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-2 shadow-sm"></span>
                      Alta
                    </span>
                  </SelectItem>
                  <SelectItem value="Média" className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-2 shadow-sm"></span>
                      Média
                    </span>
                  </SelectItem>
                  <SelectItem value="Baixa" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-2 shadow-sm"></span>
                      Baixa
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Data Limite
              </Label>
              <DatePicker
                value={formData.dueDate}
                onValueChange={(date) => setFormData({ ...formData, dueDate: date })}
                placeholder="Selecione a data limite..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Save className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">{initialData ? 'Atualizar Tarefa' : 'Criar Tarefa'}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
