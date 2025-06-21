import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, CheckCircle2, Circle, Edit, Trash2, Star, Sparkles, Target, Clock, LogOut, User } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Task, Priority } from '@/types/task';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the Q4 project proposal and submit to management',
      priority: 'high',
      dueDate: '2024-12-25',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Review team feedback',
      description: 'Go through all team feedback from last sprint',
      priority: 'medium',
      dueDate: '2024-12-22',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    taskId: string | null;
    taskTitle: string;
  }>({
    isOpen: false,
    taskId: null,
    taskTitle: '',
  });

  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
    toast({
      title: "Tarefa criada!",
      description: "Sua nova tarefa foi adicionada com sucesso.",
    });
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
      setEditingTask(null);
      toast({
        title: "Tarefa atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
    }
  };

  const handleDeleteClick = (taskId: string, taskTitle: string) => {
    setDeleteDialog({
      isOpen: true,
      taskId,
      taskTitle,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.taskId) {
      const taskToDelete = tasks.find(task => task.id === deleteDialog.taskId);
      setTasks(tasks.filter(task => task.id !== deleteDialog.taskId));
      setDeleteDialog({ isOpen: false, taskId: null, taskTitle: '' });
      toast({
        title: "Tarefa removida!",
        description: `"${taskToDelete?.title}" foi deletada com sucesso.`,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, taskId: null, taskTitle: '' });
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-orange-200 dark:border-orange-600 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-2xl shadow-lg">
                <img src="/achievo_dark.png" alt="Task Manager" className="h-12 w-12 dark:hidden rounded-2xl" />
                <img src="/achievo.png" alt="Task Manager" className="h-12 w-12 hidden dark:block rounded-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                  Task Manager
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Bem-vindo, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center border-2 border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-2xl shadow-lg">
              <img src="/achievo_dark.png" alt="Task Manager" className="h-24 w-24 dark:hidden rounded-3xl" />
              <img src="/achievo.png" alt="Task Manager" className="h-24 w-24 hidden dark:block rounded-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Organize your work and get things done efficiently</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats with more visual details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Total Tasks</span>
                  </p>
                  <p className="text-4xl font-bold animate-pulse">{tasks.length}</p>
                  <div className="mt-2 text-xs text-blue-200">Keep going! 🚀</div>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Star className="h-8 w-8 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Completed</span>
                  </p>
                  <p className="text-4xl font-bold">{completedTasks.length}</p>
                  <div className="mt-2 text-xs text-green-200">Great job! ✨</div>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <CheckCircle2 className="h-8 w-8 text-green-200" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-20 h-20 bg-white/10 rounded-full blur-lg transform translate-x-2"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 flex items-center space-x-2">
                    <Circle className="h-4 w-4" />
                    <span>Pending</span>
                  </p>
                  <p className="text-4xl font-bold">{pendingTasks.length}</p>
                  <div className="mt-2 text-xs text-orange-200">Let's do this! 💪</div>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Circle className="h-8 w-8 text-orange-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Add Task Button */}
        <div className="mb-8">
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden group"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Plus className="h-5 w-5 mr-2 relative z-10" />
            <span className="relative z-10">Add New Task</span>
            <Sparkles className="h-4 w-4 ml-2 relative z-10" />
          </Button>
        </div>

        {/* Enhanced Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border-2 border-dashed border-gray-300 dark:border-slate-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-50"></div>
              <div className="text-gray-400 dark:text-gray-500 mb-4 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full flex items-center justify-center">
                  <Circle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">No tasks yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Create your first task to get started on your journey! 🎯</p>
              </div>
            </Card>
          ) : (
            tasks.map((task, index) => (
              <Card 
                key={task.id} 
                className={`bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200 dark:border-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => handleToggleComplete(task.id)}
                        className="mt-1 hover:scale-110 transition-transform duration-200"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 hover:text-orange-500" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400': 'text-gray-900 dark:text-gray-100'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
                            {task.priority}
                          </Badge>
                          
                          {task.dueDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(task.dueDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTask(task)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(task.id, task.title)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen || editingTask !== null}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialData={editingTask}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={deleteDialog.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Confirmar Exclusão"
          description={`Tem certeza que deseja excluir a tarefa "${deleteDialog.taskTitle}"? Esta ação não pode ser desfeita.`}
          confirmText="Sim, Deletar"
          cancelText="Cancelar"
        />
      </div>
    </div>
  );
};

export default Index;
