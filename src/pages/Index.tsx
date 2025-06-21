import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TaskForm } from '@/components/TaskForm';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Task, Priority } from '@/types/task';
import { Calendar, CheckCircle, Clock, Copy, Edit, Filter, Plus, Save, Sparkles, Trash, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Link } from 'react-router-dom';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { toast } = useToast();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: uuidv4(),
      createdAt: new Date(),
      ...task,
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task Added!",
      description: "Your task has been successfully added.",
    })
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
    toast({
      title: "Task Updated!",
      description: "Your task has been successfully updated.",
    })
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task Deleted!",
      description: "Your task has been successfully deleted.",
    })
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTaskOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    totalTasks: tasks.length,
    activeTasks: tasks.filter((task) => !task.completed).length,
    completedTasks: tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 dark:from-blue-800/20 dark:to-indigo-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 dark:from-indigo-800/10 dark:to-purple-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
              Task Master
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Organize your tasks with style and efficiency</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-slate-600/50 shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="flex items-center space-x-4">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              <div>
                <h2 className="text-2xl font-semibold">{stats.totalTasks}</h2>
                <p className="text-gray-500 dark:text-gray-400">Total Tasks</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-slate-600/50 shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold">{stats.activeTasks}</h2>
                <p className="text-gray-500 dark:text-gray-400">Active Tasks</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-slate-600/50 shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="flex items-center space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <h2 className="text-2xl font-semibold">{stats.completedTasks}</h2>
                <p className="text-gray-500 dark:text-gray-400">Completed Tasks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Button */}
        <Button
          onClick={() => setNewTaskOpen(true)}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Plus className="h-4 w-4 mr-2 relative z-10" />
          <span className="relative z-10">Add New Task</span>
        </Button>

        {/* Filter Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Task List</h2>
          <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | 'active' | 'completed')}>
            <SelectTrigger className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-slate-600/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter Tasks" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-indigo-200 dark:border-slate-600">
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active Tasks</SelectItem>
              <SelectItem value="completed">Completed Tasks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-slate-600/50 shadow-lg">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleComplete(task.id)}
                    className="border-2 border-indigo-300 dark:border-slate-500"
                  />
                  <Label htmlFor={`task-${task.id}`} className="text-lg font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                    {task.title}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(task)}
                    className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border-2 border-indigo-300 dark:border-slate-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="hover:bg-red-50 dark:hover:bg-red-900/20 border-2 border-red-300 dark:border-red-500 text-red-500 dark:text-red-400"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No tasks found. Add a new task to get started!
            </div>
          )}
        </div>

        {/* TaskForm Dialog */}
        <TaskForm
          isOpen={newTaskOpen}
          onClose={() => {
            setNewTaskOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? updateTask : addTask}
          initialData={editingTask}
        />
      </div>
    </div>
  );
};

export default Index;
