'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just log to console and show success
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <div className='space-y-6'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Name */}
        <div className='space-y-2'>
          <Label htmlFor='name'>
            Name <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='name'
            type='text'
            placeholder='Your name'
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className='space-y-2'>
          <Label htmlFor='email'>
            Email <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='your.email@example.com'
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        {/* Subject */}
        <div className='space-y-2'>
          <Label htmlFor='subject'>
            Subject <span className='text-destructive'>*</span>
          </Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => handleChange('subject', value)}>
            <SelectTrigger id='subject'>
              <SelectValue placeholder='Select a subject' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bug'>Bug Report</SelectItem>
              <SelectItem value='feature'>Feature Request</SelectItem>
              <SelectItem value='support'>General Support</SelectItem>
              <SelectItem value='feedback'>Feedback</SelectItem>
              <SelectItem value='partnership'>Partnership/Business</SelectItem>
              <SelectItem value='other'>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className='space-y-2'>
          <Label htmlFor='message'>
            Message <span className='text-destructive'>*</span>
          </Label>
          <Textarea
            id='message'
            placeholder='Tell us more about your inquiry...'
            rows={6}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required
          />
          <p className='text-xs text-muted-foreground'>
            Be as detailed as possible to help us assist you better.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          size='lg'
          className='w-full'
          disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='h-5 w-5 mr-2 animate-spin' />
              Sending...
            </>
          ) : (
            <>
              <Send className='h-5 w-5 mr-2' />
              Send Message
            </>
          )}
        </Button>
      </form>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <Alert className='bg-green-500/10 border-green-500/30'>
          <CheckCircle2 className='h-4 w-4 text-green-600' />
          <AlertDescription className='text-green-700 dark:text-green-400'>
            Thank you! Your message has been sent successfully. We'll get back
            to you within 24-48 hours.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <Alert className='bg-destructive/10 border-destructive/30'>
          <AlertCircle className='h-4 w-4 text-destructive' />
          <AlertDescription className='text-destructive'>
            Something went wrong. Please try again or contact us directly at
            support@stringartgenerator.app
          </AlertDescription>
        </Alert>
      )}

      {/* Response Time Notice */}
      <Card className='bg-blue-500/5 border-blue-500/30'>
        <CardContent className='p-4'>
          <p className='text-sm text-foreground/80'>
            <strong>Response Time:</strong> We typically respond within 24-48
            hours during business days. For urgent issues, please check our{' '}
            <a href='/faq' className='text-primary hover:underline'>
              FAQ
            </a>{' '}
            first.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
