
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  currentSituation: z.string().min(10, "Please provide more detail about your current situation"),
  challengesOpportunities: z.string().min(10, "Please describe your challenges and opportunities"),
  attentionAreas: z.string().min(10, "Please specify which areas need attention"),
  workLifeIntegration: z.string().min(10, "Please describe your ideal work-life integration"),
  desiredSkills: z.string().min(10, "Please list the skills you want to develop"),
  habits: z.string().min(10, "Please describe the habits you want to build or break"),
  communityImpact: z.string().min(10, "Please explain how you want to make a difference"),
});

export type SelfReflectionFormData = z.infer<typeof formSchema>;

interface SelfReflectionFormProps {
  onSubmit: (data: SelfReflectionFormData) => void;
}

const SelfReflectionForm = ({ onSubmit }: SelfReflectionFormProps) => {
  const form = useForm<SelfReflectionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSituation: "",
      challengesOpportunities: "",
      attentionAreas: "",
      workLifeIntegration: "",
      desiredSkills: "",
      habits: "",
      communityImpact: "",
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Self-Reflection Questionnaire</CardTitle>
        <CardDescription>
          Take a moment to reflect on these questions. Your answers will help shape your personalized vision and goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentSituation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where are you now in your personal and professional life?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your current situation..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Consider your current role, responsibilities, and life circumstances.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challengesOpportunities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your current biggest challenges and opportunities?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your main challenges and potential opportunities..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attentionAreas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which areas of your life currently need the most attention?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify areas requiring focus..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workLifeIntegration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What does an ideal work-life integration look like for you?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your ideal balance..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What skills or capabilities do you want to develop?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List skills you want to acquire or improve..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="habits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What habits would you like to build or break?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe habits to develop or change..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="communityImpact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How do you want to make a difference in your community or industry?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your desired impact..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Continue</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SelfReflectionForm;
