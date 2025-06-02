import { useCallback, useEffect, useState } from "react";
import { Service, ServicesResponse } from "@/app/[locale]/home/types";

export default function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getServices = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate network delay for testing
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = await fetch('/services.json');
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            const servicesData: ServicesResponse = await response.json();
            setServices(servicesData.items);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getServices();
    }, [getServices]);

    return { services, error, isLoading, refetch: getServices };
}