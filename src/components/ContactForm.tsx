import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Send, Loader2, CheckCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10).max(1000),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    reset();

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  };

  if (submitStatus === 'success') {
    return (
      <div className="glass-card text-center py-12">
        <CheckCircle size={48} style={{ color: 'var(--color-success)' }} className="mx-auto mb-4" />
        <p
          className="text-lg font-medium"
          style={{ color: 'var(--color-success)', fontFamily: 'var(--font-sans)' }}
        >
          {t('contact.form.success')}
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5">
      {/* Name */}
      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {t('contact.form.name')}
        </label>
        <input
          {...register('name')}
          placeholder={t('contact.form.name')}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.name && (
          <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
            {errors.name.type === 'too_small'
              ? t('contact.form.errors.name_min')
              : t('contact.form.errors.name_max')}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {t('contact.form.email_label')}
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder={t('contact.form.email')}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.email && (
          <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
            {t('contact.form.errors.email_invalid')}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {t('contact.form.subject_label')}
        </label>
        <select
          {...register('subject')}
          style={{
            ...inputStyle,
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '20px',
            paddingRight: '40px',
          }}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="">{t('contact.form.subjects.placeholder')}</option>
          <option value="project">{t('contact.form.subjects.project')}</option>
          <option value="freelance">{t('contact.form.subjects.freelance')}</option>
          <option value="consulting">{t('contact.form.subjects.consulting')}</option>
          <option value="other">{t('contact.form.subjects.other')}</option>
        </select>
        {errors.subject && (
          <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
            {t('contact.form.errors.subject_required')}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {t('contact.form.message_label')}
        </label>
        <textarea
          {...register('message')}
          rows={6}
          placeholder={t('contact.form.message')}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px',
          }}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.message && (
          <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
            {errors.message.type === 'too_small'
              ? t('contact.form.errors.message_min')
              : t('contact.form.errors.message_max')}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary w-full justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send size={18} />
            {t('contact.form.submit')}
          </>
        )}
      </button>
    </form>
  );
}
