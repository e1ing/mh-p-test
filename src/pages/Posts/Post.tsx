import { PostType } from "../../api";
import { Card, List, Typography, Tag, Image } from 'antd';
import { CalendarOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';

interface PostProps {
    post: PostType;
}
export const Post = ({ post }: PostProps) => {
    return (
        <Card
            style={{ maxWidth: 800, margin: '0 auto', marginTop: 24 }}
            cover={
                post.previewPicture.url && (
                    <Image
                        alt={post.previewPicture.name}
                        src={post.previewPicture.url}
                        style={{ maxHeight: 400, objectFit: 'cover' }}
                    />
                )
            }
        >
            <Title level={2}>{post.title}</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                Код: {post.code}
            </Text>

            <List itemLayout="horizontal">
                {/* Автор */}
                <List.Item>
                    <List.Item.Meta
                        avatar={<UserOutlined />}
                        title="Автор"
                        description={post.authorName}
                    />
                </List.Item>

                {/* Теги */}
                <List.Item>
                    <List.Item.Meta
                        avatar={<TagOutlined />}
                        title="Теги"
                        description={
                            <div>
                                {post.tagNames.map((tag) => (
                                    <Tag key={tag} color="blue">
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        }
                    />
                </List.Item>

                {/* Дата создания */}
                <List.Item>
                    <List.Item.Meta
                        avatar={<CalendarOutlined />}
                        title="Дата создания"
                        description={new Date(post.createdAt).toLocaleString()}
                    />
                </List.Item>

                {/* Дата обновления */}
                <List.Item>
                    <List.Item.Meta
                        avatar={<CalendarOutlined />}
                        title="Дата обновления"
                        description={new Date(post.updatedAt).toLocaleString()}
                    />
                </List.Item>
            </List>
        </Card>
    )
}