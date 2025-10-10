import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles.css';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SectionBlock from './components/SectionBlock';
import ProductCard from './components/ProductCard';
import SpecialOffers from './components/SpecialOffers';
import StoreLocations from './components/StoreLocations';
import ArticlesSection from './components/ArticlesSection';
import Footer from './components/Footer';

const mockProducts = [
  {
    image: '/assets/images/pancakes.png',
    title: 'Г/Ц Блинчики с мясом вес. Россия',
    price: '44,50',
    oldPrice: '50,50',
    discount: '-12%',
  },
  {
    image: '/assets/images/milk1.png',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное',
    price: '64,90',
    oldPrice: '79,90',
    discount: '-19%',
  },
  {
    image: '/assets/images/colbasa.png',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ',
    price: '199,00',
    oldPrice: '249,00',
    discount: '-20%',
  },
  {
    image: '/assets/images/sausages.png',
    title: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ',
    price: '159,00',
    oldPrice: '189,00',
    discount: '-16%',
  },
  {
    image: '/assets/images/milk1.png',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное',
    price: '64,90',
    oldPrice: '79,90',
    discount: '-19%',
  },
];

const mockNewProducts = [
  {
    image: '/assets/images/palka.png',
    title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
    price: '599,99',
    isNew: true,
  },
  {
    image: '/assets/images/colbasa.png',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ',
    price: '199,00',
    isNew: true,
  },
  {
    image: '/assets/images/colbasa.png',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ',
    price: '199,00',
    isNew: true,
  },
  {
    image: '/assets/images/sausages.png',
    title: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ',
    price: '159,00',
    isNew: true,
  },
  {
    image: '/assets/images/milk1.png',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное',
    price: '64,90',
    isNew: true,
  },
];

const mockBoughtBefore = [
  {
    image: '/assets/images/palka.png',
    title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
    price: '599,99',
    boughtBefore: true,
  },
  {
    image: '/assets/images/vetchina.png',
    title: 'Ветчина варёная',
    price: '77,99',
    boughtBefore: true,
  },
  {
    image: '/assets/images/colbasa.png',
    title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ',
    price: '199,00',
    boughtBefore: true,
  },
  {
    image: '/assets/images/sausages.png',
    title: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ',
    price: '159,00',
    boughtBefore: true,
  },
  {
    image: '/assets/images/milk1.png',
    title: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное',
    price: '64,90',
    boughtBefore: true,
  },
];

function App() {
  return (
    <Router>
      <div className="app-root">
        <Header />
        <HeroBanner />
        <SectionBlock title="Акции" rightLink={{ href: '#', text: 'Все акции' }}>
          {mockProducts.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </SectionBlock>
        <SectionBlock title="Новинки" rightLink={{ href: '#', text: 'Все новинки' }}>
          {mockNewProducts.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </SectionBlock>
        <SectionBlock title="Покупали раньше" rightLink={{ href: '#', text: 'Все покупки' }}>
          {mockBoughtBefore.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </SectionBlock>
        <SpecialOffers />
        <StoreLocations />
        <ArticlesSection />
        <Footer />
      </div>
      <Routes>
        {/* Здесь будут маршруты для других страниц */}
      </Routes>
    </Router>
  );
}

export default App;
