
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, CheckCircle2, Circle, Edit, Trash2, Star } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
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

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your work and get things done efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Tasks</p>
                  <p className="text-3xl font-bold">{tasks.length}</p>
                </div>
                <Star className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <p className="text-3xl font-bold">{completedTasks.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pending</p>
                  <p className="text-3xl font-bold">{pendingTasks.length}</p>
                </div>
                <Circle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Button */}
        <div className="mb-8">
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Circle className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                <p>Create your first task to get started!</p>
              </div>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className={`transition-all duration-300 hover:shadow-lg ${task.completed ? 'opacity-75' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => handleToggleComplete(task.id)}
                        className="mt-1 hover:scale-110 transition-transform duration-200"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 hover:text-indigo-500" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
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
                        onClick={() => handleDeleteTask(task.id)}
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
      </div>
    </div>
  );
};

export default Index;
