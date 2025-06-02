import { useCallback, useEffect, useState } from "react";
import { Testimonial } from "@/app/[locale]/home/types";

interface TestimonialsResponse {
    items: Testimonial[];
}

export default function useTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getTestimonials = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate network delay for testing
            // await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = await fetch('/testimonials.json');
            if (!response.ok) {
                throw new Error('Failed to fetch testimonials');
            }
            const data: TestimonialsResponse = await response.json();
            setTestimonials(data.items);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getTestimonials();
    }, [getTestimonials]);

    return { testimonials, error, isLoading, refetch: getTestimonials };
} 