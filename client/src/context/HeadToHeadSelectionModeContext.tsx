import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import HeadToHeadSelectionModePopover from '../pages/Home/components/HeadToHeadSelectionPopover/HeadToHeadSelectionPopover';

interface HeadToHeadSelectionModeContextInterface {
  headToHeadSelectionMode: boolean;
  setHeadToHeadSelectionMode: (
    headToHeadSelectionMode: boolean | ((arg: boolean) => boolean),
  ) => void;
  selectedServices: string[];
  handleAddServiceForComparison: (service: string) => void;
}

const useHeadToHeadSelectionModeContext = () => {
  return useContext(HeadToHeadSelectionModeContext);
};

const HeadToHeadSelectionModeContext =
  createContext<HeadToHeadSelectionModeContextInterface>({
    headToHeadSelectionMode: false,
    setHeadToHeadSelectionMode: () => { },
    selectedServices: [],
    handleAddServiceForComparison: () => { },
  });

const HeadToHeadSelectionModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [headToHeadSelectionMode, setHeadToHeadSelectionMode] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddServiceForComparison = (serviceTitle: string) => {
    if (!headToHeadSelectionMode) return;

    if (selectedServices.includes(serviceTitle)) {
      setSelectedServices(
        selectedServices.filter(
          (selectedService) => selectedService !== serviceTitle,
        ),
      );
    } else {
      setSelectedServices([...selectedServices, serviceTitle]);
    }
  };

  useEffect(() => {
    if (selectedServices.length >= 2) {
      setHeadToHeadSelectionMode(false);
      navigate(`/head-to-head?services=${selectedServices.join(',')}`);
      setSelectedServices([]);
    }
  }, [selectedServices, navigate]);

  useEffect(() => {
    if (headToHeadSelectionMode && location.pathname !== '/') {
      navigate('/');
    }
  }, [location, headToHeadSelectionMode, navigate]);

  return (
    <HeadToHeadSelectionModeContext.Provider
      value={{
        headToHeadSelectionMode,
        setHeadToHeadSelectionMode,
        selectedServices,
        handleAddServiceForComparison,
      }}
    >
      {headToHeadSelectionMode && <HeadToHeadSelectionModePopover />}
      {children}
    </HeadToHeadSelectionModeContext.Provider>
  );
};

export {
  HeadToHeadSelectionModeContextProvider,
  useHeadToHeadSelectionModeContext,
};
