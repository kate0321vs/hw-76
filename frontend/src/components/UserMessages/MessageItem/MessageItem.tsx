import dayjs from "dayjs";
import {Card, CardContent, CardHeader, Divider, Typography} from "@mui/material";

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
  return (
      <Card sx={{ width: '55%', margin: '30px auto' }}>
          <CardHeader
              title={author}
              sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
          />
          <CardContent>
              <Typography variant="body1" gutterBottom>
                  {message}
              </Typography>
              <Divider sx={{ margin: '8px 0' }} />
              <Typography variant="caption" color="textSecondary">
                  {dayjs(datetime).format('YYYY-MM-DD HH:mm')}
              </Typography>
          </CardContent>
      </Card>
  );
};

export default MessageItem;