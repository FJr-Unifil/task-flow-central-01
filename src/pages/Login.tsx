import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithApple } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
        });
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo!",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithApple();
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo!",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Erro ao fazer login com Apple');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-purple-300/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-200/10 to-orange-200/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-5 dark:opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'var(--color-gray-900)'
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 relative flex justify-between items-start">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-xl"></div>
            
            <CardHeader className="text-center relative z-10">
              <div className="mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg w-fit">
                <img src="/achievo_dark.png" alt="Task Manager" className="h-14 w-14 dark:hidden rounded-lg" />
                <img src="/achievo.png" alt="Task Manager" className="h-14 w-14 hidden dark:block rounded-lg" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                Bem-vindo de volta!
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Entre na sua conta para continuar
              </p>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full border border-gray-200 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-1">
                    <Lock className="h-4 w-4" />
                    <span>Senha</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Sua senha"
                      className="w-full border border-gray-200 dark:border-slate-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:focus:ring-orange-500/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-orange-600 dark:border-orange-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10">
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </span>
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 px-2 text-gray-500 dark:text-gray-400">
                    Ou continue com
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAppleLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Apple</span>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/register" 
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-200"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login; 