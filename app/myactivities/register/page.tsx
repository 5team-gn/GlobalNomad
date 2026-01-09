'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { InputField } from '@/components/input/inputfield';
import { Input } from '@/components/input/Input';
import { Button, ButtonLabel } from '@/components/button/Button';
import { generateTimeOptions } from '@/lib/utils/time';
import { BasicModal, AlertModal } from '@/components/modal';
import Image from 'next/image';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function RegisterActivityPage() {
  const router = useRouter();

  // 폼 상태
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  
  // 시간대 관리
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', date: '', startTime: '12:00', endTime: '12:00' }
  ]);
  
  // 이미지 관리
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [introImages, setIntroImages] = useState<File[]>([]);
  const [introPreviews, setIntroPreviews] = useState<string[]>([]);

  // 모달 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const timeOptions = generateTimeOptions();

  // 폼이 수정되었는지 추적
  useEffect(() => {
    if (title || category || description || price || address || timeSlots.length > 1 || bannerImage || introImages.length > 0) {
      setIsFormDirty(true);
    }
  }, [title, category, description, price, address, timeSlots, bannerImage, introImages]);

  // 브라우저 새로고침/닫기 감지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFormDirty]);

  // 브라우저 뒤로가기 감지
  useEffect(() => {
    if (isFormDirty) {
      // 히스토리에 현재 페이지 추가
      window.history.pushState(null, '', window.location.href);

      const handlePopState = () => {
        // 뒤로가기 버튼 클릭 시
        window.history.pushState(null, '', window.location.href);
        setShowExitModal(true);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isFormDirty]);

  // 시간대 추가
  const handleAddTimeSlot = () => {
    const firstSlot = timeSlots[0];
    
    if (!firstSlot.date) {
      alert('날짜를 입력해주세요');
      return;
    }

    const newSlot = {
      id: String(Date.now()),
      date: firstSlot.date,
      startTime: firstSlot.startTime,
      endTime: firstSlot.endTime,
    };

    setTimeSlots([
      { id: '1', date: '', startTime: '12:00', endTime: '12:00' },
      newSlot,
      ...timeSlots.slice(1),
    ]);
  };

  // 시간대 삭제
  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  // 시간대 업데이트
  const handleTimeSlotChange = (id: string, field: keyof TimeSlot, value: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  // 배너 이미지 업로드
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 배너 이미지 삭제
  const handleRemoveBanner = () => {
    setBannerImage(null);
    setBannerPreview('');
  };

  // 소개 이미지 업로드
  const handleIntroImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (introImages.length + files.length > 4) {
      alert('최대 4개의 이미지만 업로드 가능합니다');
      return;
    }

    setIntroImages([...introImages, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIntroPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 소개 이미지 삭제
  const handleRemoveIntroImage = (index: number) => {
    setIntroImages(introImages.filter((_, i) => i !== index));
    setIntroPreviews(introPreviews.filter((_, i) => i !== index));
  };

  // 폼 제출
  const handleSubmit = async () => {
    
    if (!title || !category || !description || !price || !address) {
      alert('모든 필드를 입력해주세요');
      return;
    }

    if (!bannerImage) {
      alert('배너 이미지를 등록해주세요');
      return;
    }

    if (introImages.length === 0) {
      alert('소개 이미지를 최소 1개 이상 등록해주세요');
      return;
    }

    // API 호출 로직
    console.log('체험 등록:', {
      title,
      category,
      description,
      price,
      address,
      timeSlots,
      bannerImage,
      introImages,
    });

    
    setIsFormDirty(false); 
    setShowSuccessModal(true);
  };

  // 성공 모달 닫기 후 페이지 이동
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/myactivities'); 
  };

  // 페이지 이탈 확인 
  const handleNavigateAway = () => {
    if (isFormDirty) {
      setShowExitModal(true);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-[700px] mx-auto py-[60px] px-[16px] md:px-0">
          <h1 className="text-24-b md:text-32-b text-gray-950 mb-[24px] md:mb-[40px]">내 체험 등록</h1>

          <div className="space-y-[24px] md:space-y-[40px]">
            {/* 제목 */}
            <InputField
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해 주세요"
            />

            {/* 카테고리 */}
            <div className="flex flex-col gap-[10px]">
              <label className="text-16-m text-gray-900">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] text-16-m outline-none focus:ring-primary-500 ${
                  !category ? 'text-gray-400' : 'text-gray-900'
                }`}
              >
                <option value="">카테고리를 선택해 주세요</option>
                <option value="문화 · 예술">문화 · 예술</option>
                <option value="식음료">식음료</option>
                <option value="스포츠">스포츠</option>
                <option value="투어">투어</option>
                <option value="관광">관광</option>
                <option value="웰빙">웰빙</option>
              </select>
            </div>

            {/* 설명 */}
            <div className="flex flex-col gap-[10px]">
              <label className="text-16-m text-gray-900">설명</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="체험에 대한 설명을 입력해 주세요"
                rows={10}
                className="w-full rounded-[16px] border border-gray-200 px-[20px] py-[16px] text-16-m outline-none focus:ring-primary-500 resize-none"
              />
            </div>

            {/* 가격 */}
            <InputField
              label="가격"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격을 입력해 주세요"
            />

            {/* 주소 */}
            <InputField
              label="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력해 주세요"
            />

            {/* 예약 가능한 시간대 */}
            <div className="flex flex-col gap-[16px] md:gap-[24px]">
              <label className="text-18-b md:text-20-b text-gray-950">예약 가능한 시간대</label>

              {/* Desktop 버전 */}
              <div className="hidden md:block space-y-[8px]">
                {/* 헤더 라벨 */}
                <div className="grid grid-cols-[1fr_140px_20px_140px_56px] gap-[8px] mb-[8px]">
                  <div className="text-14-m text-gray-700">날짜</div>
                  <div className="text-14-m text-gray-700">시작 시간</div>
                  <div></div>
                  <div className="text-14-m text-gray-700">종료 시간</div>
                  <div></div>
                </div>

                {/* 첫 번째 줄 - + 버튼 */}
                <div className="grid grid-cols-[1fr_140px_20px_140px_56px] gap-[8px] items-center">
                  <input
                    type="text"
                    value={timeSlots[0]?.date || ''}
                    onChange={(e) => handleTimeSlotChange(timeSlots[0]?.id, 'date', e.target.value)}
                    placeholder="yy/mm/dd"
                    onFocus={(e) => {
                      e.target.type = 'date';
                      e.target.placeholder = '';
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.type = 'text';
                        e.target.placeholder = 'yy/mm/dd';
                      }
                    }}
                    className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] text-16-m outline-none focus:border-primary-500"
                  />

                  <select
                    value={timeSlots[0]?.startTime || '12:00'}
                    onChange={(e) => handleTimeSlotChange(timeSlots[0]?.id, 'startTime', e.target.value)}
                    className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[16px] text-16-m outline-none focus:border-primary-500"
                  >
                    {timeOptions.map((time: string) => (
                      <option key={`start-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>

                  <span className="text-18-m text-gray-400 text-center">~</span>

                  <select
                    value={timeSlots[0]?.endTime || '12:00'}
                    onChange={(e) => handleTimeSlotChange(timeSlots[0]?.id, 'endTime', e.target.value)}
                    className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[16px] text-16-m outline-none focus:border-primary-500"
                  >
                    {timeOptions.map((time: string) => (
                      <option key={`end-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddTimeSlot}
                    className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* 추가된 시간대들 */}
                {timeSlots.slice(1).map((slot) => (
                  <div key={slot.id} className="grid grid-cols-[1fr_140px_20px_140px_56px] gap-[8px] items-center">
                    <div className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] flex items-center text-16-m text-gray-900">
                      {slot.date}
                    </div>

                    <div className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[16px] flex items-center text-16-m text-gray-900">
                      {slot.startTime}
                    </div>

                    <span className="text-18-m text-gray-400 text-center">~</span>

                    <div className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[16px] flex items-center text-16-m text-gray-900">
                      {slot.endTime}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveTimeSlot(slot.id)}
                      className="w-[56px] h-[56px] flex items-center justify-center rounded-[6px] border border-gray-300 hover:bg-gray-50"
                    >
                      <span className="text-20-m text-gray-600">-</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile 버전 */}
              <div className="md:hidden space-y-[16px]">
                {timeSlots.map((slot, index) => (
                  <div key={slot.id} className="space-y-[8px]">
                    <div className="text-14-m text-gray-700">날짜</div>
                    
                    <div className="flex gap-[8px]">
                      <input
                        type="text"
                        value={slot.date}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'date', e.target.value)}
                        placeholder="yy/mm/dd"
                        onFocus={(e) => {
                          e.target.type = 'date';
                          e.target.placeholder = '';
                        }}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.type = 'text';
                            e.target.placeholder = 'yy/mm/dd';
                          }
                        }}
                        className="flex-1 h-[54px] rounded-[16px] border border-gray-200 px-[20px] text-16-m outline-none focus:border-primary-500"
                        readOnly={index !== 0}
                      />
                      
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={handleAddTimeSlot}
                          className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 transition-colors shrink-0"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-[8px]">
                      <select
                        value={slot.startTime}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'startTime', e.target.value)}
                        className="flex-1 h-[54px] rounded-[16px] border border-gray-200 px-[16px] text-16-m outline-none focus:border-primary-500"
                        disabled={index !== 0}
                      >
                        {timeOptions.map((time: string) => (
                          <option key={`start-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      <span className="text-16-m text-gray-400">~</span>

                      <select
                        value={slot.endTime}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'endTime', e.target.value)}
                        className="flex-1 h-[54px] rounded-[16px] border border-gray-200 px-[16px] text-16-m outline-none focus:border-primary-500"
                        disabled={index !== 0}
                      >
                        {timeOptions.map((time: string) => (
                          <option key={`end-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeSlot(slot.id)}
                          className="w-[56px] h-[56px] flex items-center justify-center rounded-[6px] border border-gray-300 hover:bg-gray-50 shrink-0"
                        >
                          <span className="text-20-m text-gray-600">-</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 배너 이미지 등록 */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-18-b md:text-20-b text-gray-950">배너 이미지 등록</label>
              
              {bannerPreview ? (
                <div className="relative w-full h-[167px] md:h-[180px] rounded-[24px] overflow-hidden">
                  <Image
                    src={bannerPreview}
                    alt="배너 이미지"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveBanner}
                    className="absolute top-3 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white text-20-b hover:bg-black/80"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-full h-[167px] md:h-[180px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[24px] cursor-pointer hover:border-primary-500 transition-colors bg-gray-25">
                  <div className="flex flex-col items-center gap-[12px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="#9FA0A7" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-16-m text-gray-600">이미지 등록</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* 소개 이미지 등록 */}
            <div className="flex flex-col gap-[16px]">
              <label className="text-18-b md:text-20-b text-gray-950">소개 이미지 등록</label>
              
              <div className="grid grid-cols-2 gap-[16px]">
                {introPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-[24px] overflow-hidden">
                    <Image
                      src={preview}
                      alt={`소개 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIntroImage(index)}
                      className="absolute top-3 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white text-20-b hover:bg-black/80"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {Array.from({ length: 4 - introImages.length }).map((_, index) => (
                  <label
                    key={`empty-${index}`}
                    className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[24px] cursor-pointer hover:border-primary-500 transition-colors bg-gray-25"
                  >
                    <div className="flex flex-col items-center gap-[12px]">
                      <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19M5 12H19" stroke="#9FA0A7" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-14-m md:text-16-m text-gray-600">이미지 등록</p>
                      <p className="text-12-m text-gray-400">{introImages.length}/{index + introImages.length + 1}</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIntroImagesUpload}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
              <p className="text-14-m text-gray-500">*최대 4개까지 등록 가능합니다</p>
            </div>

            {/* 등록하기 버튼 */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              className="w-full"
            >
              <ButtonLabel>등록하기</ButtonLabel>
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* 저장 성공 모달 */}
      <BasicModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        text="체험 등록이 완료되었습니다"
        buttonText="확인"
        onConfirm={handleSuccessModalClose}
      />

      {/* 페이지 이탈 확인 모달 */}
      <AlertModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        text={'저장되지 않았습니다.\n정말 뒤로 가시겠습니까?'}
        cancelText="아니요"
        confirmText="네"
        onCancel={() => setShowExitModal(false)}
        onConfirm={() => {
          setIsFormDirty(false);
          setShowExitModal(false);
          // 실제 뒤로가기 실행
          window.history.back();
        }}
      />
    </div>
  );
}