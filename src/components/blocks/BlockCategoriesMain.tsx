// @ts-nocheck
// application
import AppLink from "../shared/AppLink";
import BlockHeader from "../shared/BlockHeader";
import url from "../../services/url";
import { ICategory } from "../../interfaces/main";
import { useRouter } from "next/router";
// import { locale } from 'moment';

export type BlockCategoriesLayout = "classic" | "compact";

export interface BlockCategoriesProps {
    title?: string;
    categories?: ICategory[];
    layout?: BlockCategoriesLayout;
}

function BlockCategoriesMain(props: BlockCategoriesProps) {
    const { title, layout = "classic", categories = [] } = props;
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const categoriesList = categories.map((category, index) => {
        const classes = `block-categories__item category-card category-card--layout--${layout}`;
        // const { subCategories }: { subCategories?: ISubCategory[] } = category;

        // const subcategoriesLinks = subCategories && subCategories.slice(0, 3).map((sub, subIndex) => (
        //     <li key={subIndex}>
        //         <AppLink href={url.categoryWithSubCategory(category.id, sub.id)}>{sub.name}</AppLink>
        //     </li>
        // ));
        // if (subCategories.length > 3) {
        //     subcategoriesLinks.push(
        //         <li key={3}>
        //             <AppLink>.....</AppLink>
        //         </li>,
        //     );
        // }

        return (
            <div key={index} className={classes}>
                <div className="category-card__body_custom">
                    <div className="category-card__image_custom">
                        <AppLink 
                        // onClick={()=>{router.push(`/categories/${category.id}?locale=${locale}`)}}
                        href={url.exportCategory(category.id, locale)} 
                        >
                            <img src={category.imageUrl} alt={category.name} />
                        </AppLink>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories block-categories--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-categories__list">{categoriesList}</div>
            </div>
        </div>
    );
}

export default BlockCategoriesMain;
