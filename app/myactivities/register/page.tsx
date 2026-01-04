'use client';

import { useState } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { InputField } from '@/components/input/inputfield';
import { Input } from '@/components/input/Input';
import { Button, ButtonLabel } from '@/components/button/Button';
import { generateTimeOptions } from '@/lib/utils/time';
import Image from 'next/image';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function RegisterActivityPage() {
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

  const timeOptions = generateTimeOptions();

  // 시간대 추가
  const handleAddTimeSlot = () => {
    const newId = String(Date.now());
    setTimeSlots([...timeSlots, { id: newId, date: '', startTime: '12:00', endTime: '12:00' }]);
  };

  // 시간대 삭제
  const handleRemoveTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    }
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
    // 유효성 검사
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

    // TODO: API 호출
    alert('체험이 등록되었습니다!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-[700px] mx-auto py-[60px]">
          <h1 className="text-32-b text-gray-950 mb-[40px]">내 체험 등록</h1>

          <div className="space-y-[40px]">
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
                className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[20px] text-sm outline-none focus:ring-primary-500"
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
                className="w-full rounded-[16px] border border-gray-200 px-[20px] py-[16px] text-sm outline-none focus:ring-primary-500 resize-none"
              />
            </div>

            {/* 가격 */}
            <InputField
              label="가격"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="체험 금액을 입력해 주세요"
            />

            {/* 주소 */}
            <InputField
              label="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력해 주세요"
            />

            {/* 예약 가능한 시간대 */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <label className="text-16-m text-gray-900">예약 가능한 시간대</label>
                <button
                  type="button"
                  onClick={handleAddTimeSlot}
                  className="text-14-m text-primary-500 hover:text-primary-600"
                >
                  + 시간대 추가
                </button>
              </div>

              <div className="space-y-[16px]">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center gap-[8px]">
                    {/* 날짜 */}
                    <div className="flex-1">
                      <Input
                        type="date"
                        value={slot.date}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'date', e.target.value)}
                        placeholder="YY/MM/DD"
                      />
                    </div>

                    {/* 시작 시간 */}
                    <div className="w-[120px]">
                      <select
                        value={slot.startTime}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'startTime', e.target.value)}
                        className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[12px] text-sm outline-none"
                      >
                        {timeOptions.map((time) => (
                          <option key={`start-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="text-gray-500">~</span>

                    {/* 종료 시간 */}
                    <div className="w-[120px]">
                      <select
                        value={slot.endTime}
                        onChange={(e) => handleTimeSlotChange(slot.id, 'endTime', e.target.value)}
                        className="h-[54px] w-full rounded-[16px] border border-gray-200 px-[12px] text-sm outline-none"
                      >
                        {timeOptions.map((time) => (
                          <option key={`end-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 삭제 버튼 */}
                    {timeSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTimeSlot(slot.id)}
                        className="w-[54px] h-[54px] flex items-center justify-center rounded-[16px] border border-gray-200 hover:bg-gray-50"
                      >
                        <span className="text-gray-500">-</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 배너 이미지 등록 */}
            <div className="flex flex-col gap-[10px]">
              <label className="text-16-m text-gray-900">배너 이미지 등록</label>
              
              {bannerPreview ? (
                <div className="relative w-full h-[200px] rounded-[16px] overflow-hidden border border-gray-200">
                  <Image
                    src={bannerPreview}
                    alt="배너 이미지"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveBanner}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-full h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[16px] cursor-pointer hover:border-primary-500">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
                        <path d="M24 16V32M16 24H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-14-m text-gray-500">이미지 등록</p>
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
            <div className="flex flex-col gap-[10px]">
              <label className="text-16-m text-gray-900">소개 이미지 등록</label>
              
              <div className="grid grid-cols-4 gap-[16px]">
                {/* 업로드된 이미지들 */}
                {introPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-[16px] overflow-hidden border border-gray-200">
                    <Image
                      src={preview}
                      alt={`소개 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIntroImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white text-sm hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* 추가 업로드 버튼 */}
                {introImages.length < 4 && (
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[16px] cursor-pointer hover:border-primary-500">
                    <div className="text-center">
                      <div className="text-gray-400 mb-1">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto">
                          <path d="M16 10V22M10 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-12-m text-gray-500">이미지 등록</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleIntroImagesUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-12-m text-gray-500">*최대 4개까지 등록 가능합니다</p>
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
    </div>
  );
}