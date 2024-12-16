declare module 'react-rating' {
    import * as React from 'react';
  
    interface RatingProps {
      readonly readonly?: boolean;
      readonly placeholderRating?: number;
      readonly placeholderSymbol?: React.ReactNode;
      readonly emptySymbol?: React.ReactNode;
      readonly fullSymbol?: React.ReactNode;
      readonly fractions?: number;
      readonly initialRating?: number;
      readonly onChange?: (rate: number) => void;
      readonly onHover?: (rate: number) => void;
      readonly stop?: number;
      readonly step?: number;
    }
  
    class Rating extends React.Component<RatingProps> {}
  
    export = Rating;
  }
  