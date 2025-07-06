import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

// Buat channel untuk Android
export async function createChannel() {
  await notifee.createChannel({
    id: 'task-reminders',
    name: 'Task Reminders',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });
}

// Schedule notification di waktu tertentu
export async function scheduleTaskNotification(
  id: string,
  title: string,
  body: string,
  timestamp: number
) {
  // Pastikan channel sudah dibuat
  await createChannel();

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: 'task-reminders',
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp, // dalam milisecond
    }
  );
}
