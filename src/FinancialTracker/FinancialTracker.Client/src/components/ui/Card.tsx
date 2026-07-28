
interface CardProps {
    children: React.ReactNode;
    title?: string;
}
function Card({ children, title }: CardProps) {
  return (
      <div>
          {title && <h2>{title}</h2>}
          {children}
      </div>
  );
}

export default Card;