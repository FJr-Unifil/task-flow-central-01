import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle2, Clock, Star, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-purple-300/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-200/10 to-orange-200/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'var(--color-gray-900)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="mx-auto mb-8 rounded-3xl shadow-2xl w-fit">
            <img src="/achievo_dark.png" alt="Task Manager" className="h-24 w-24 dark:hidden rounded-3xl" />
            <img src="/achievo.png" alt="Task Manager" className="h-24 w-24 hidden dark:block rounded-3xl" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Organize suas tarefas, aumente sua produtividade e alcance seus objetivos com nossa plataforma intuitiva e poderosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="h-5 w-5" />
                <span>Entrar</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                size="lg"
                className="border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5" />
                <span>Criar conta</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200 dark:border-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organização Intuitiva</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Organize suas tarefas por prioridade, data de vencimento e status de conclusão de forma simples e eficiente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200 dark:border-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 rounded-full opacity-20 blur-xl"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Acompanhamento Visual</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Visualize seu progresso com estatísticas em tempo real e acompanhe sua produtividade com gráficos intuitivos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border-2 border-orange-200 dark:border-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gestão de Tempo</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Defina prazos, configure lembretes e gerencie seu tempo de forma eficaz para maximizar sua produtividade.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full animate-pulse"></div>
            <CardContent className="p-8 relative z-10">
              <div className="mx-auto mb-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm w-fit">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Pronto para aumentar sua produtividade?</h2>
              <p className="text-orange-100 mb-6 max-w-md mx-auto">
                Junte-se a milhares de usuários que já transformaram sua forma de trabalhar com o Task Manager.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Começar agora</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing; 