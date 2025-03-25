import dayjs from "dayjs";
import {Card, CardContent, CardHeader, Divider, Typography} from "@mui/material";

interface Props {
    author: string;
    message: string;
    datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
    const today = new Date().toISOString().split('T')[0];
    const getYesterday = () => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        return d;
    };
    const yesterday = getYesterday().toISOString().split('T')[0];
    const date = new Date(datetime).toISOString().split('T')[0];
    const year = new Date(datetime).toISOString().split('-')[0];
    const nowYear = new Date().toISOString().split('-')[0];

    let currentDate = '';

    if (today === date) {
        currentDate = 'Today' + dayjs(datetime).format(' HH:mm');
    } else if (yesterday === date) {
        currentDate = 'Yesterday' + dayjs(datetime).format(' HH:mm');
    } else {
        if (year === nowYear) {
            currentDate = dayjs(datetime).format('MM-DD HH:mm');
        } else {
            currentDate = dayjs(datetime).format('YYYY-MM-DD HH:mm');
        }
    }

    return (
        <Card sx={{width: '55%', margin: '30px auto'}}>
            <CardHeader
                title={author}
                sx={{backgroundColor: '#abcdef', fontWeight: 'bold'}}
            />
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    {message}
                </Typography>
                <Divider sx={{margin: '8px 0'}}/>
                <Typography variant="caption" color="textSecondary">
                    {currentDate}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MessageItem;