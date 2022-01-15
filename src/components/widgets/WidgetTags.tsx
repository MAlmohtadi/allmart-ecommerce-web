// application
import AppLink from '../shared/AppLink';

function WidgetTags() {
    return (
        <div className="widget-tags widget">
            <h4 className="widget__title">Tags Cloud</h4>
            <div className="tags tags--lg">
                <div className="tags__list">
                    <AppLink href="/">Promotion</AppLink>
                    <AppLink href="/">Power Tool</AppLink>
                    <AppLink href="/">New Arrivals</AppLink>
                    <AppLink href="/">Screwdriver</AppLink>
                    <AppLink href="/">Wrench</AppLink>
                    <AppLink href="/">Mounts</AppLink>
                    <AppLink href="/">Electrodes</AppLink>
                    <AppLink href="/">Chainsaws</AppLink>
                    <AppLink href="/">Manometers</AppLink>
                    <AppLink href="/">Nails</AppLink>
                    <AppLink href="/">Air Guns</AppLink>
                    <AppLink href="/">Cutting Discs</AppLink>
                </div>
            </div>
        </div>
    );
}

export default WidgetTags;
