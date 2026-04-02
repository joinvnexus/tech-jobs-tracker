"use client"

import { motion } from "framer-motion"
import { Mail, Send, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email")
})

type NewsletterForm = z.infer<typeof newsletterSchema>

export function NewsletterSection() {
  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = (data: NewsletterForm) => {
    // Handle newsletter signup
    console.log("Newsletter signup:", data)
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/20 to-background/50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="container-app"
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-50/40 via-white/80 to-seeker-50/40 backdrop-blur-xl shadow-2xl shadow-brand-500/10 border-brand-200/50">
          <div className="grid md:grid-cols-2 items-center gap-8 p-2 md:p-0">
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-12"
            >
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-brand-500/20 rounded-2xl blur-xl" />
              <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-br from-seeker-500/15 rounded-xl blur-lg" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 px-4 py-2 rounded-full text-sm font-medium border border-brand-200/50">
                  <Mail className="h-4 w-4" />
                  Weekly job digest
                </div>
                
                <div className="space-y-4">
                  <CardTitle className="text-3xl lg:text-4xl font-heading leading-tight">
                    Get exclusive job alerts
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Join 15k+ professionals getting curated job matches delivered to their inbox every week. 
                    Never miss your dream role again.
                  </CardDescription>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all">
                    <ShieldCheck className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Verified companies</p>
                      <p className="text-sm text-muted-foreground">Only legitimate employers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all">
                    <Sparkles className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Smart matching</p>
                      <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 md:p-12"
            >
              <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-glow-brand/30 transition-all duration-500 border-brand-200/30">
                <CardContent className="p-8 space-y-6">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                      <Input 
                        placeholder="Enter your email address"
                        {...form.register("email")}
                        className="h-14 text-lg pl-12 pr-12 border-2 border-border/50 focus:border-brand-500 focus-visible:ring-brand-500/50 shadow-glow-brand/20"
                      />
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      {form.formState.errors.email && (
                        <p className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-14 w-full group shadow-lg shadow-brand-500/25 hover:shadow-glow-brand/75 bg-gradient-to-r from-brand-500 to-seeker-500 hover:from-brand-600 hover:to-seeker-600 text-lg font-semibold"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Send className="mr-2 h-5 w-5 animate-pulse" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          Get Started Free
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="text-xs text-muted-foreground/70 text-center pt-4 border-t border-border/30">
                    <p>We respect your privacy. Unsubscribe at any time.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
