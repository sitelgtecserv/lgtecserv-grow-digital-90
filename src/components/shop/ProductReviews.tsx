import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    id: string;
    full_name: string;
  };
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Buscar perfis dos usuários
      const userIds = data?.map(r => r.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      const reviewsWithProfiles = data?.map(review => ({
        ...review,
        profiles: profiles?.find(p => p.id === review.user_id)
      })) || [];

      setReviews(reviewsWithProfiles);
      
      if (user) {
        const myReview = data?.find((r) => r.user_id === user.id);
        if (myReview) {
          setUserReview(myReview);
          setRating(myReview.rating);
          setComment(myReview.comment || "");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para avaliar produtos.",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Selecione uma avaliação",
        description: "Por favor, selecione quantas estrelas você dá ao produto.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        product_id: productId,
        user_id: user.id,
        rating,
        comment: comment.trim() || null,
      };

      if (userReview) {
        const { error } = await supabase
          .from("product_reviews")
          .update(reviewData)
          .eq("id", userReview.id);

        if (error) throw error;
        toast({ title: "Avaliação atualizada com sucesso!" });
      } else {
        const { error } = await supabase
          .from("product_reviews")
          .insert(reviewData);

        if (error) throw error;
        toast({ title: "Avaliação enviada com sucesso!" });
      }

      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Erro ao enviar avaliação",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!userReview) return;

    try {
      const { error } = await supabase
        .from("product_reviews")
        .delete()
        .eq("id", userReview.id);

      if (error) throw error;

      setUserReview(null);
      setRating(0);
      setComment("");
      fetchReviews();
      toast({ title: "Avaliação removida com sucesso!" });
    } catch (error: any) {
      toast({
        title: "Erro ao remover avaliação",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Avaliações dos Clientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.length > 0 && (
            <div className="flex items-center gap-4 pb-4 border-b">
              <StarRating rating={averageRating} showValue size={24} />
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          )}

          {user && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {userReview ? "Sua avaliação" : "Avaliar este produto"}
                </label>
                <StarRating
                  rating={rating}
                  interactive
                  onRatingChange={setRating}
                  size={32}
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Comentário (opcional)
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte sua experiência com o produto..."
                  rows={4}
                  maxLength={500}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {userReview ? "Atualizar avaliação" : "Enviar avaliação"}
                </Button>
                {userReview && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          )}

          {!user && (
            <Alert>
              <AlertDescription>
                Faça login para avaliar este produto e compartilhar sua experiência.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Seja o primeiro a avaliar este produto!
              </p>
            )}

            {reviews
              .filter((r) => r.id !== userReview?.id)
              .map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">
                          {review.profiles?.full_name || "Usuário"}
                        </p>
                        <StarRating rating={review.rating} size={16} />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {review.comment}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
