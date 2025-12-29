<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessage extends Notification
{
    use Queueable;

    public function __construct(
        public ContactMessage $message
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Contact Message from ' . $this->message->name)
            ->greeting('New Contact Message Received')
            ->line('You have received a new contact message from your website.')
            ->line('**Name:** ' . $this->message->name)
            ->line('**Email:** ' . $this->message->email)
            ->line('**Phone:** ' . ($this->message->phone ?? 'N/A'))
            ->line('**Company:** ' . ($this->message->company ?? 'N/A'))
            ->line('**Message:**')
            ->line($this->message->message)
            ->action('View in Admin Panel', url('/admin/messages/' . $this->message->id))
            ->line('Please respond to this inquiry as soon as possible.');
    }
}
