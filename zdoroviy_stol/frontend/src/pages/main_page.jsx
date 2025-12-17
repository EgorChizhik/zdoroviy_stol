import Header from '../components/Header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: '0 50px' }}>
        {/* Баннер */}
        <section style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: '#e8f5e9', borderRadius: '20px', padding: '60px',
          margin: '40px 0', gap: '40px'
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '48px', color: '#1b5e20', marginBottom: '20px' }}>
              Healthy, Organic, Food
            </h1>
            <p style={{ fontSize: '18px', color: '#333', marginBottom: '30px', lineHeight: 1.6 }}>
              Добро пожаловать на крупнейший портал о здоровом питании!<br />
              Узнайте последние новости, исследования и рецепты.
            </p>
            <Link to="/news" style={{
              display: 'inline-block', padding: '15px 30px', backgroundColor: '#2e7d32',
              color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold'
            }}>
              Читать статьи
            </Link>
          </div>
          <div style={{
            flex: 1, height: '300px', backgroundColor: '#c8e6c9', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1b5e20', fontSize: '24px', opacity: 0.7
          }}>
            Главное фото
          </div>
        </section>

        {/* Новые статьи */}
        <section style={{ margin: '60px 0' }}>
          <h2 style={{ fontSize: '32px', color: '#1b5e20', marginBottom: '30px',
                     borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
            Новые статьи
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {/* Статья 1 */}
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ height: '200px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '15px',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           color: '#666', fontSize: '40px' }}>
                Фото статьи
              </div>
              <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e8f5e9',
                            color: '#1b5e20', borderRadius: '15px', fontSize: '12px', marginBottom: '10px' }}>
                Питание
              </span>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', minHeight: '50px' }}>
                10 продуктов для здоровья сердца
              </h3>
              <div style={{ color: '#666', fontSize: '14px' }}>42 лайка</div>
            </div>

            {/* Статья 2 */}
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ height: '200px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '15px',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           color: '#666', fontSize: '40px' }}>
                Фото статьи
              </div>
              <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e8f5e9',
                            color: '#1b5e20', borderRadius: '15px', fontSize: '12px', marginBottom: '10px' }}>
                Здоровье
              </span>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', minHeight: '50px' }}>
                Как правильно пить воду
              </h3>
              <div style={{ color: '#666', fontSize: '14px' }}>28 лайков</div>
            </div>

            {/* Статья 3 */}
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ height: '200px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '15px',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           color: '#666', fontSize: '40px' }}>
                Фото статьи
              </div>
              <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e8f5e9',
                            color: '#1b5e20', borderRadius: '15px', fontSize: '12px', marginBottom: '10px' }}>
                Питание
              </span>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', minHeight: '50px' }}>
                Веганство: за и против
              </h3>
              <div style={{ color: '#666', fontSize: '14px' }}>56 лайков</div>
            </div>

            {/* Статья 4 */}
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ height: '200px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '15px',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           color: '#666', fontSize: '40px' }}>
                Фото статьи
              </div>
              <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e8f5e9',
                            color: '#1b5e20', borderRadius: '15px', fontSize: '12px', marginBottom: '10px' }}>
                Сезонное
              </span>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', minHeight: '50px' }}>
                Сезонные овощи декабря
              </h3>
              <div style={{ color: '#666', fontSize: '14px' }}>31 лайк</div>
            </div>
          </div>
        </section>

        {/* Авторы */}
        <section style={{ margin: '60px 0' }}>
          <h2 style={{ fontSize: '32px', color: '#1b5e20', marginBottom: '30px',
                     borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
            Популярные авторы
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' }}>
            {/* Автор 1 */}
            <div style={{ textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '25px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e0e0e0',
                           margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                           fontSize: '40px' }}>Автор</div>
              <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Анна Иванова</h3>
              <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '10px' }}>Диетолог</p>
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>Статей: 24</p>
            </div>

            {/* Автор 2 */}
            <div style={{ textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '25px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e0e0e0',
                           margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                           fontSize: '40px' }}>Автор</div>
              <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Дмитрий Петров</h3>
              <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '10px' }}>Нутрициолог</p>
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>Статей: 18</p>
            </div>

            {/* Автор 3 */}
            <div style={{ textAlign: 'center', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '25px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e0e0e0',
                           margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                           fontSize: '40px' }}>Автор</div>
              <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Мария Сидорова</h3>
              <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '10px' }}>Шеф-повар</p>
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>Статей: 32</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}