import Select, { SingleValue } from "react-select";
import { useCreateBlogContext } from "src/contexts/CreateBlogContext";
import styled from "styled-components";

interface Option {
  value: string;
}
const StyledReactSelect = styled(Select<Option, false>)`
  .react-select__control {
    border-color: #ccc;
    &:hover {
      border-color: #9f7aea;
    }
    &--is-focused {
      box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.3);
      border-color: #9f7aea;
    }
  }
`;
const OptionSelector = () => {
  const { category, setCategory } = useCreateBlogContext();
  const categories = [
    "DEPRESSION",
    "TROUBLE_INSOMNIE_ANXIETE",
    "TROUBLE_PANIQUE",
    "PHOBIE",
    "PHOBIE_SPECIFIQUE",
    "TOC",
    "TROUBLE_BIPOLAIRE",
    "ADDICTION",
    "TROUBLE_SOMATIQUE",
    "INTERVENTION_IMMEDIATE_NECESSAIRE",
    "TROUBLE_SPECTRE_AUTISTIQUE",
    "CONSULTATION_PROFESSIONNELLE_RECOMMANDEE",
  ];
  const categoryOptions: Option[] = categories.map((category) => ({
    value: category,
  }));
  const handleCategoryChange = (selectedOption: SingleValue<Option>) => {
    setCategory(selectedOption?.value || "");
  };
  return (
    <StyledReactSelect
      options={categoryOptions}
      value={categoryOptions.find((option) => option.value === category)}
      onChange={handleCategoryChange}
      placeholder="Select Category"
      isSearchable={true}
      isClearable={true}
    />
  );
};
export default OptionSelector;
