import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Star, ShoppingCart, ArrowLeft, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { products, reviews } from '../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/products">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square overflow-hidden rounded-2xl border relative">
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-3 py-1 z-10">
                -{product.discount}% OFF
              </Badge>
            )}
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Badge className="mb-3">{product.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-5xl font-bold">${product.price.toFixed(2)}</span>
              {product.discount && (
                <Badge variant="destructive" className="text-sm">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

            <div className="flex gap-3 mb-6">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart className="size-5 mr-2" />
                Add to Cart
              </Button>
              <Button onClick={handleWishlist} size="lg" variant="outline">
                <Heart className={`size-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <Truck className="size-8 mb-2 text-primary" />
                  <p className="text-xs font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over $50</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <RotateCcw className="size-8 mb-2 text-primary" />
                  <p className="text-xs font-medium">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Easy refunds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-4">
                  <Shield className="size-8 mb-2 text-primary" />
                  <p className="text-xs font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">SSL encrypted</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <Tabs defaultValue="reviews" className="mb-16">
        <TabsList>
          <TabsTrigger value="reviews">Reviews ({productReviews.length})</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-6">
          {productReviews.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {productReviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium text-green-600">In Stock</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-medium">TECH-{product.id.padStart(4, '0')}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty</span>
                <span className="font-medium">1 Year Manufacturer Warranty</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
