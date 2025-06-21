import React, { FC, useState, useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import categories from '@/components/filter/categories';
import { CategoryNode } from '@/app/model';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    handleCategoryChange: (value: number | undefined) => void;
    defaultValue?: string
}

function findCategoryPathById(
    categories: CategoryNode[],
    targetId: number,
): number[] | null {
    for (const category of categories) {
        if (category.id === targetId) {
            return [category.id];
        }

        if (category.nested.length > 0) {
            const nestedPath = findCategoryPathById(category.nested, targetId);
            if (nestedPath) {
                return [category.id, ...nestedPath];
            }
        }
    }

    return null;
}

const resolveCategoryPath = (
    categories: CategoryNode[],
    path: number[],
): { currentCategories: CategoryNode[]; parentName: string | null } => {
    let currentLevel = categories;
    let name: string | null = null;

    for (const id of path) {
        const found = currentLevel.find((c) => c.id === id);
        if (found) {
            name = found.name;
            currentLevel = found.nested;
        } else {
            return { currentCategories: [], parentName: null };
        }
    }

    return { currentCategories: currentLevel, parentName: name };
};

const CategoriesNestingMenu: FC<Props> = ({ handleCategoryChange, defaultValue }) => {
    const [path, setPath] = useState<number[]>([]);

    const { currentCategories, parentName } = useMemo(() => {
        return resolveCategoryPath(categories, path);
    }, [path]);

    const handleEnter = (id: number) => {
        setPath([...path, id]);
        handleCategoryChange(id)
    };

    const handleBack = () => {
        const parentCategoryId = path.slice(0, -1);
        setPath(parentCategoryId);
        handleCategoryChange(parentCategoryId[parentCategoryId.length - 1]);
    };

    useEffect(() => {
        if (defaultValue) {
            const defaultPath = findCategoryPathById(categories, Number(defaultValue))
            setPath(defaultPath ?? []);
        }
    }, [])

    return (
        <Box>
            <Typography variant='h6' color='primary' paddingBlockEnd={1}>Kategoria</Typography>
            {parentName &&
                <Button
                    startIcon={<ArrowBackIcon/>}
                    size='small'
                    fullWidth
                    sx={{
                        textAlign: 'left', justifyContent: 'flex-start',
                    }}
                    onClick={() => handleBack()}
                >
                    <Typography variant='button' textAlign='left'>{parentName}</Typography>
                </Button>
            }
            <Box paddingBlockStart={1}>
                {currentCategories.map(category => (
                    <Box key={category.id}>
                        <Button
                            size='small'
                            fullWidth
                            sx={{
                                minWidth: 0, textAlign: 'left', justifyContent: 'flex-start',
                            }}
                            onClick={() => handleEnter(category.id)}>
                            <Typography variant='button' color='textPrimary'>{category.name}</Typography>
                        </Button>
                    </Box>

                ))}
            </Box>
        </Box>

    );
};

export default CategoriesNestingMenu;