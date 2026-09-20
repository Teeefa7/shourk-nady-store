'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './SizeGuideModal.module.css';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const { locale } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close size guide">
          ✕
        </button>

        <h3 className={styles.title}>
          {locale === 'ar' ? 'دليل المقاسات الملكي للعبايات' : 'Luxury Abaya Size & Height Guide'}
        </h3>
        <p className={styles.subtitle}>
          {locale === 'ar'
            ? 'تعتمد مقاسات العبايات في الخليج العربي على طولك الإجمالي من الكتف إلى الأسفل بالبوصة.'
            : 'Abaya sizing in the Gulf region is based on your full body height from shoulder to floor in inches.'}
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>{locale === 'ar' ? 'مقاس العباية' : 'Abaya Size'}</th>
              <th>{locale === 'ar' ? 'طول المرأة (سم)' : 'Your Height (cm)'}</th>
              <th>{locale === 'ar' ? 'طول المرأة (قدم/بوصة)' : 'Your Height (ft/in)'}</th>
              <th>{locale === 'ar' ? 'عرض الصدر (بوصة)' : 'Bust Width (in)'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>52</strong></td>
              <td>150 - 155 cm</td>
              <td>5&apos;0&quot; - 5&apos;1&quot;</td>
              <td>21&quot; - 22&quot;</td>
            </tr>
            <tr>
              <td><strong>54</strong></td>
              <td>156 - 160 cm</td>
              <td>5&apos;2&quot; - 5&apos;3&quot;</td>
              <td>22&quot; - 23&quot;</td>
            </tr>
            <tr>
              <td><strong>56</strong></td>
              <td>161 - 165 cm</td>
              <td>5&apos;4&quot; - 5&apos;5&quot;</td>
              <td>23&quot; - 24&quot;</td>
            </tr>
            <tr>
              <td><strong>58</strong></td>
              <td>166 - 170 cm</td>
              <td>5&apos;6&quot; - 5&apos;7&quot;</td>
              <td>24&quot; - 25&quot;</td>
            </tr>
            <tr>
              <td><strong>60</strong></td>
              <td>171 - 175 cm</td>
              <td>5&apos;8&quot; - 5&apos;9&quot;</td>
              <td>25&quot; - 26&quot;</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.tipBox}>
          💡 <strong>{locale === 'ar' ? 'نصيحة الخياطة الملكية:' : 'Atelier Styling Tip:'}</strong>{' '}
          {locale === 'ar'
            ? 'إذا كنت تخططين لارتداء كعب عالٍ مع العباية، نوصي باختيار مقاس أعلى بدرجة واحدة (مثلاً ٥٦ بدلاً من ٥٤).'
            : 'If you plan to wear high heels with your abaya, we recommend opting for one size longer (e.g. Size 56 instead of 54).'}
        </div>
      </div>
    </div>
  );
};
