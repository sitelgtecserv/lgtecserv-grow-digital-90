import { ShoppingBag, LogOut, Shield, Menu, Search, History, Gift, LogIn } from 'lucide-react';

const LOGO_URL = '/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface ShopHeaderProps {
  onCartOpen?: () => void;
  onSearchOpen?: () => void;
}

export const ShopHeader = ({ onCartOpen, onSearchOpen }: ShopHeaderProps) => {
  const { user, signOut, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCartClick = () => {
    if (onCartOpen) {
      onCartOpen();
    } else {
      navigate('/carrinho');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/loja');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/loja')}>
            <img src={LOGO_URL} alt="LG TecServ" className="h-9 w-9 rounded-lg object-contain" />
            <div>
              <h1 className="text-xl font-bold">LG TecServ</h1>
              <p className="text-xs text-muted-foreground">Loja Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleCartClick}
                className="relative"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Carrinho
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" onClick={() => navigate('/admin')}>
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}
            {user ? (
              <>
                <Button variant="outline" onClick={() => navigate('/meus-pedidos')}>
                  <History className="mr-2 h-4 w-4" />
                  Meus Pedidos
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => navigate('/auth')}>
                <LogIn className="mr-2 h-4 w-4" />
                Entrar / Criar Conta
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img src={LOGO_URL} alt="LG TecServ" className="h-8 w-8 rounded-lg object-contain" />
                  {user ? (
                    <div>
                      <p className="font-semibold truncate max-w-[150px] sm:max-w-none">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {isAdmin ? 'Administrador' : 'Cliente'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">LG TecServ</p>
                      <p className="text-xs text-muted-foreground">Visitante</p>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    navigate('/loja');
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Loja
                </Button>
                {user && (
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      navigate('/meus-pedidos');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <History className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </Button>
                )}
                {user && isAdmin && (
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      navigate('/admin');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                )}

                {/* Benefícios para visitantes */}
                {!user && (
                  <div className="my-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">Benefícios da conta</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                      <li>Histórico de pedidos</li>
                      <li>Brinde após 3 compras</li>
                      <li>Promoções exclusivas</li>
                    </ul>
                  </div>
                )}

                {user ? (
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar / Criar Conta
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/loja')}>
            <img src={LOGO_URL} alt="LG TecServ" className="h-7 w-7 rounded-lg object-contain" />
            <h1 className="text-lg font-bold">LG TecServ</h1>
          </div>

          <div className="flex items-center gap-1">
            {onSearchOpen && (
              <Button variant="ghost" size="icon" onClick={onSearchOpen}>
                <Search className="h-5 w-5" />
              </Button>
            )}
            {cartCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]"
                >
                  {cartCount}
                </Badge>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
