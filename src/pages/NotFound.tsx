import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Home, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-purple-300/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-100/10 to-red-100/10 dark:from-orange-900/5 dark:to-red-900/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <Card className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-slate-800/90 dark:to-slate-900/90 border border-gray-200 dark:border-slate-700 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800/50 dark:to-red-800/50 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full opacity-20 blur-xl"></div>
          
          <div className="grid md:grid-cols-2 gap-8 h-full">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg w-fit p-4 mx-auto md:mx-0">
                  <span className="text-5xl font-bold text-white">404</span>
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
                  Página não encontrada
                </CardTitle>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  Ops! Parece que você se perdeu no caminho digital.
                </p>
                
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  A página que você está tentando acessar não existe, foi movida ou está temporariamente indisponível.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border border-orange-600 dark:border-orange-700 shadow-md hover:shadow-lg transition-all">
                    <Link to="/" className="flex items-center justify-center space-x-2">
                      <Home className="h-4 w-4" />
                      <span>Página Inicial</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <Link to="/landing" className="flex items-center justify-center space-x-2">
                      <Compass className="h-4 w-4" />
                      <span>Explorar</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-900 p-8 md:p-12 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700 h-full">
              <div className="relative w-full max-w-xs">
                <svg 
                  className="w-full h-auto" 
                  viewBox="0 0 800 600" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M400 550C206.5 550 50 393.5 50 200C50 6.5 206.5 -150 400 -150C593.5 -150 750 6.5 750 200C750 393.5 593.5 550 400 550Z" 
                    fill="#FEE2E2" 
                    className="dark:fill-red-900/20"
                  />
                  <path 
                    d="M400 500C233.5 500 100 366.5 100 200C100 33.5 233.5 -100 400 -100C566.5 -100 700 33.5 700 200C700 366.5 566.5 500 400 500Z" 
                    fill="#FCA5A5" 
                    className="dark:fill-red-700/30"
                    fillOpacity="0.5"
                  />
                  <path 
                    d="M400 450C260.5 450 150 339.5 150 200C150 60.5 260.5 -50 400 -50C539.5 -50 650 60.5 650 200C650 339.5 539.5 450 400 450Z" 
                    fill="#EF4444" 
                    className="dark:fill-red-500/40"
                  />
                  <text 
                    x="400" 
                    y="220" 
                    fontSize="180" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    fill="#EF4444"
                    className="dark:fill-red-500/40"
                  >
                    4
                  </text>
                  <path 
                    d="M450 50C450 77.6142 427.614 100 400 100C372.386 100 350 77.6142 350 50C350 22.3858 372.386 0 400 0C427.614 0 450 22.3858 450 50Z" 
                    fill="#EF4444"
                    className="dark:fill-red-500/40"
                  />
                  <path 
                    d="M450 400C450 427.614 427.614 450 400 450C372.386 450 350 427.614 350 400C350 372.386 372.386 350 400 350C427.614 350 450 372.386 450 400Z" 
                    fill="#EF4444"
                    className="dark:fill-red-500/40"
                  />
                </svg>
                
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full opacity-70"></div>
                <div className="absolute top-1/4 -right-6 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-70"></div>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Precisa de ajuda?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
                Fale com o suporte
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
