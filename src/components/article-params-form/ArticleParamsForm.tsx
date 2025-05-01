import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { Spacing } from '../spacing';
import { Text } from 'components/text';

export type ArticleStateType = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = ({
	formState,
	onFormChange,
	onApply,
	onReset,
}: {
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleCloseForm = (e: MouseEvent | KeyboardEvent) => {
			if (e instanceof KeyboardEvent && e.key === 'Escape') {
				setIsOpen(false);
			} else if (
				e instanceof MouseEvent &&
				formRef.current &&
				!formRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleCloseForm);
		document.addEventListener('mousedown', handleCloseForm);

		return () => {
			document.removeEventListener('keydown', handleCloseForm);
			document.removeEventListener('mousedown', handleCloseForm);
		};
	}, []);

	function toggleFrom() {
		setIsOpen(!isOpen);
	}

	const handleFontFamilyChange = (option: OptionType) => {
		onFormChange({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		onFormChange({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: OptionType) => {
		onFormChange({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		onFormChange({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		onFormChange({ ...formState, contentWidth: option });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton onClick={toggleFrom} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Spacing size={50} />

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>

					<Spacing size={50} />

					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name={'fontSize'}
						onChange={handleFontSizeChange}
					/>

					<Spacing size={50} />

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>

					<Spacing size={50} />

					<Separator />

					<Spacing size={50} />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>

					<Spacing size={50} />

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

					{/* <Spacing size={72} /> */}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
