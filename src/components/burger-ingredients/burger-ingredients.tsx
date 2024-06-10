import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
<<<<<<< HEAD

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const buns = [];
  const mains = [];
  const sauces = [];
=======
import { ingredientsSelector } from '../../services/slice/ingredietsSlice';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const ingredients = useSelector(ingredientsSelector);
  const buns = ingredients.filter((ingredient) => {
    if (ingredient.type === 'bun') {
      return ingredient;
    }
  });
  const mains = ingredients.filter((ingredient) => {
    if (ingredient.type === 'main') {
      return ingredient;
    }
  });
  const sauces = ingredients.filter((ingredient) => {
    if (ingredient.type === 'sauce') {
      return ingredient;
    }
  });
>>>>>>> review

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

<<<<<<< HEAD
  return null;
=======
  // return null;
>>>>>>> review

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
